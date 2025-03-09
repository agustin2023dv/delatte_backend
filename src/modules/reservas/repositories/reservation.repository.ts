import Reservation from "../models/Reservation.model";
import Restaurant from "../../restaurantes/models/Restaurant.model";
import { IReservation } from "@delatte/shared/interfaces";

export class ReservationRepository {

  // 📌 Crear una reserva
  static async createReservation(reservationData: Partial<IReservation>) {
    return await Reservation.create(reservationData);
  }

  // 📌 Obtener una reserva por ID
  static async getReservationById(id: string) {
    return await Reservation.findById(id)
      .populate("restaurante", "nombre direccion")
      .populate("usuario", "nombre apellido email");
  }

  // 📌 Obtener todas las reservas (Superadmins)
  static async getAllReservations() {
    return await Reservation.find()
      .populate("restaurante", "nombre direccion")
      .populate("usuario", "nombre apellido email");
  }

  // 📌 Obtener reservas por usuario (customer)
  static async getReservationsByUser(userId: string) {
    return await Reservation.find({ usuario: userId })
      .populate("usuario", "nombre apellido email")
      .populate("restaurante", "nombre direccion");
  }

  // 📌 Obtener reservas por restaurante
  static async getReservationsByRestaurant(restaurantId: string) {
    return await Reservation.find({ restaurante: restaurantId })
      .populate("usuario", "nombre apellido email phone");
  }

  // 📌 Obtener reservas según el rol del usuario
  static async getReservationsByRole(userId: string, role: string) {
    if (role === "customer") {
      return await Reservation.find({ usuario: userId })
        .populate("restaurante", "nombre apellido direccion");
    } else if (role === "manager") {
      const restaurant = await Restaurant.findOne({ managerPrincipal: userId });
      if (!restaurant) throw new Error("No se encontró restaurante para este manager");
      return await Reservation.find({ restaurante: restaurant._id })
        .populate("usuario", "nombre direccion email");
    } else {
      throw new Error("Rol no válido o usuario no encontrado.");
    }
  }

  // 📌 Actualizar una reserva
  static async updateReservation(reservationId: string, updatedData: Partial<IReservation>) {
    return await Reservation.findByIdAndUpdate(reservationId, updatedData, { new: true });
  }

  // 📌 Cancelar una reserva
  static async cancelReservation(reservationId: string) {
    return await Reservation.findByIdAndUpdate(reservationId, { estado: "Cancelada" }, { new: true });
  }

  // 📌 Verificar si un restaurante existe
  static async restaurantExists(restaurantId: string) {
    return await Restaurant.findById(restaurantId);
  }
}
