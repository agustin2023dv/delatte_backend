import { injectable } from "inversify";
import Reservation from "../models/Reservation.model";
import Restaurant from "../../restaurantes/models/Restaurant.model";
import { IReservation, IRestaurant } from "@delatte/shared/interfaces";
import { IReservationBaseRepository } from "../interfaces/IReservationBaseRepository";
import { ICreateReservationDTO, IUpdateReservationDTO, IReservationResponseDTO } from "@delatte/shared/dtos";
import { ReservationMongoInput } from "../types/reservation.types";

@injectable()
export class ReservationBaseRepository implements IReservationBaseRepository {

  async createReservation(reservationData: ReservationMongoInput): Promise<IReservation> {
    return await Reservation.create(reservationData);
  }

  async getReservationById(id: string): Promise<IReservation | null> {
    return await Reservation.findById(id)
      .populate("restaurantInfo.restaurante", "nombre direccion")
      .populate("userInfo.usuario", "nombre apellido email");
  }

  async getAllReservations(): Promise<IReservation[]> {
    return await Reservation.find()
      .populate("restaurantInfo.restaurante", "nombre direccion")
      .populate("userInfo.usuario", "nombre apellido email");
  }

  async getReservationsByUser(userId: string): Promise<IReservation[]> {
    return await Reservation.find({ "userInfo.usuario": userId })
      .populate("userInfo.usuario", "nombre apellido email")
      .populate("restaurantInfo.restaurante", "nombre direccion");
  }

  async getReservationsByRestaurant(restaurantId: string): Promise<IReservation[]> {
    return await Reservation.find({ "restaurantInfo.restaurante": restaurantId })
      .populate("userInfo.usuario", "nombre apellido email phone");
  }

  async getReservationsByRole(userId: string, role: string): Promise<IReservation[]> {
    if (role === "customer") {
      return await Reservation.find({ "userInfo.usuario": userId })
        .populate("restaurantInfo.restaurante", "nombre direccion");
    } else if (role === "manager") {
      const restaurant = await Restaurant.findOne({ managerPrincipal: userId }).lean();
      if (!restaurant) throw new Error("No se encontró restaurante para este manager");
      return await Reservation.find({ "restaurantInfo.restaurante": restaurant._id })
        .populate("userInfo.usuario", "nombre direccion email");
    } else {
      throw new Error("Rol no válido o usuario no encontrado.");
    }
  }

  async updateReservation(reservationId: string, updatedData: IUpdateReservationDTO): Promise<IReservation | null> {
    return await Reservation.findByIdAndUpdate(reservationId, updatedData, { new: true });
  }

  async cancelReservation(reservationId: string): Promise<IReservation | null> {
    return await Reservation.findByIdAndUpdate(
      reservationId,
      { "reservationStatus.estado": "Cancelada" },
      { new: true }
    );
  }

  async restaurantExists(restaurantId: string): Promise<IRestaurant | null> {
    return await Restaurant.findById(restaurantId);
  }

  async findFutureByUser(userId: string): Promise<IReservationResponseDTO[]> {
    const now = new Date();
    return await Reservation.find({
      "userInfo.usuario": userId,
      $expr: {
        $gt: [
          { $dateFromString: { dateString: { $concat: [
              { $dateToString: { format: "%Y-%m-%d", date: "$reservationData.fecha" } },
              "T",
              "$reservationData.horario"
          ] } } },
          now
        ]
      }
    })
    .populate("restaurantInfo.restaurante", "nombre direccion")
    .populate("userInfo.usuario", "nombre apellido email")
    .lean<IReservationResponseDTO[]>();
  }

  async findPastByUser(userId: string): Promise<IReservationResponseDTO[]> {
    const now = new Date();
    return await Reservation.find({
      "userInfo.usuario": userId,
      $expr: {
        $lt: [
          { $dateFromString: { dateString: { $concat: [
              { $dateToString: { format: "%Y-%m-%d", date: "$reservationData.fecha" } },
              "T",
              "$reservationData.horario"
          ] } } },
          now
        ]
      }
    })
    .populate("restaurantInfo.restaurante", "nombre direccion")
    .populate("userInfo.usuario", "nombre apellido email")
    .lean<IReservationResponseDTO[]>();
  }
}
