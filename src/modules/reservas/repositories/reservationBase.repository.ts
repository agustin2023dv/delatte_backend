import { injectable } from "inversify";
import Reservation from "../models/Reservation.model";
import Restaurant from "../../restaurantes/models/Restaurant.model";
import { IReservation } from "@delatte/shared/interfaces";
import { IReservationBaseRepository } from "../interfaces/IReservationBaseRepository";

@injectable()
export class ReservationBaseRepository implements IReservationBaseRepository {

    async createReservation(reservationData: Partial<IReservation>) {
        return await Reservation.create(reservationData);
    }

    async getReservationById(id: string) {
        return await Reservation.findById(id)
            .populate("restaurante", "nombre direccion")
            .populate("usuario", "nombre apellido email");
    }

    async getAllReservations() {
        return await Reservation.find()
            .populate("restaurante", "nombre direccion")
            .populate("usuario", "nombre apellido email");
    }

    async getReservationsByUser(userId: string) {
        return await Reservation.find({ usuario: userId })
            .populate("usuario", "nombre apellido email")
            .populate("restaurante", "nombre direccion");
    }

    async getReservationsByRestaurant(restaurantId: string) {
        return await Reservation.find({ restaurante: restaurantId })
            .populate("usuario", "nombre apellido email phone");
    }

    async getReservationsByRole(userId: string, role: string) {
        if (role === "customer") {
            return await Reservation.find({ usuario: userId })
                .populate("restaurante", "nombre direccion");
        } else if (role === "manager") {
            const restaurant = await Restaurant.findOne({ managerPrincipal: userId }).lean();
            if (!restaurant) throw new Error("No se encontró restaurante para este manager");
            return await Reservation.find({ restaurante: restaurant._id })
                .populate("usuario", "nombre direccion email");
        } else {
            throw new Error("Rol no válido o usuario no encontrado.");
        }
    }

    async updateReservation(reservationId: string, updatedData: Partial<IReservation>) {
        return await Reservation.findByIdAndUpdate(reservationId, updatedData, { new: true });
    }

    async cancelReservation(reservationId: string) {
        return await Reservation.findByIdAndUpdate(reservationId, { estado: "Cancelada" }, { new: true });
    }

    async restaurantExists(restaurantId: string) {
        return await Restaurant.findById(restaurantId);
    }
}
