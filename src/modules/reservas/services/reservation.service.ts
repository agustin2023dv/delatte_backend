import { IReservation } from "@delatte/shared/interfaces";
import { ReservationRepository } from "../repositories/reservation.repository";
import { Types } from "mongoose";

export class ReservationService {
  private static toObjectId(id: string): Types.ObjectId {
    return new Types.ObjectId(id);
  }

  //* 📌 Crear reserva como cliente (customer)
  static async createCustomerReservation(
    userId: string,
    restauranteId: string,
    fecha: Date,
    horario: string,
    numAdultos: number,
    numNinos: number,
    pedidosEspeciales?: string
  ) {
    if (!(await ReservationRepository.restaurantExists(restauranteId))) {
      throw new Error("Restaurante no encontrado");
    }

    return await ReservationRepository.createReservation({
      usuario: this.toObjectId(userId),
      restaurante: this.toObjectId(restauranteId),
      fecha,
      horario,
      numAdultos,
      numNinos,
      pedidosEspeciales,
      estado: "Confirmada",
    });
  }

  //* 📌 Crear reserva como manager (para clientes)
  static async createManagerReservation(
    managerId: string,
    clienteId: string,
    restauranteId: string,
    fecha: Date,
    horario: string,
    numAdultos: number,
    numNinos: number,
    pedidosEspeciales?: string
  ) {
    const restaurant = await ReservationRepository.restaurantExists(restauranteId);
    if (!restaurant) {
      throw new Error("Restaurante no encontrado");
    }

    const isManager = restaurant.managerPrincipal.toString() === managerId;
    const isCoManager = restaurant.coManagers.some(
      (coManager) => coManager.toString() === managerId
    );

    if (!isManager && !isCoManager) {
      throw new Error("No puedes crear reservas en un restaurante que no administras");
    }

    return await ReservationRepository.createReservation({
      usuario: this.toObjectId(clienteId),
      restaurante: this.toObjectId(restauranteId),
      fecha,
      horario,
      numAdultos,
      numNinos,
      pedidosEspeciales,
      estado: "Confirmada",
    });
  }

  //* 📌 Crear reserva como superadmin (puede forzar reservas)
  static async createSuperadminReservation(
    clienteId: string,
    restauranteId: string,
    fecha: Date,
    horario: string,
    numAdultos: number,
    numNinos: number,
    pedidosEspeciales?: string
  ) {
    return await ReservationRepository.createReservation({
      usuario: this.toObjectId(clienteId),
      restaurante: this.toObjectId(restauranteId),
      fecha,
      horario,
      numAdultos,
      numNinos,
      pedidosEspeciales,
      estado: "Confirmada",
    });
  }

  //* 📌 Obtener una reserva por ID
  static async getReservationById(id: string) {
    return await ReservationRepository.getReservationById(id);
  }

  //* 📌 Obtener todas las reservas (solo superadmins)
  static async getAllReservations() {
    return await ReservationRepository.getAllReservations();
  }

  //* 📌 Obtener reservas de un usuario
  static async getReservationsByUser(userId: string) {
    return await ReservationRepository.getReservationsByUser(userId);
  }

  //* 📌 Obtener reservas de un restaurante
  static async getReservationsByRestaurant(restaurantId: string) {
    return await ReservationRepository.getReservationsByRestaurant(restaurantId);
  }

  //* 📌 Obtener reservas según el rol del usuario
  static async getReservationsById(userId: string, role: string) {
    return await ReservationRepository.getReservationsByRole(userId, role);
  }

  //* 📌 Actualizar una reserva
  static async updateReservation(reservationId: string, updatedData: Partial<IReservation>) {
    return await ReservationRepository.updateReservation(reservationId, updatedData);
  }

  //* 📌 Cancelar una reserva
  static async cancelReservation(reservationId: string) {
    return await ReservationRepository.cancelReservation(reservationId);
  }
}
