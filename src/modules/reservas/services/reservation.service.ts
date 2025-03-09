
import { IReservation } from "@delatte/shared/interfaces";
import { ReservationRepository } from "../repositories/reservation.repository";
import { Types } from "mongoose";

const toObjectId = (id: string): Types.ObjectId => new Types.ObjectId(id);

/**
 * Crea una reserva como cliente (customer)
 */
export const createCustomerReservationService = async (
  userId: string,
  restauranteId: string,
  fecha: Date,
  horario: string,
  numAdultos: number,
  numNinos: number,
  pedidosEspeciales?: string
) => {
  if (!(await ReservationRepository.restaurantExists(restauranteId))) {
    throw new Error("Restaurante no encontrado");
  }

  return await ReservationRepository.createReservation({
    usuario: toObjectId(userId),
    restaurante: toObjectId(restauranteId),
    fecha,
    horario,
    numAdultos,
    numNinos,
    pedidosEspeciales,
    estado: "Confirmada",
  });
};

/**
 * Crea una reserva como manager (para clientes)
 */
export const createManagerReservationService = async (
  managerId: string,
  clienteId: string,
  restauranteId: string,
  fecha: Date,
  horario: string,
  numAdultos: number,
  numNinos: number,
  pedidosEspeciales?: string
) => {
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
    usuario: toObjectId(clienteId),
    restaurante: toObjectId(restauranteId),
    fecha,
    horario,
    numAdultos,
    numNinos,
    pedidosEspeciales,
    estado: "Confirmada",
  });
};

/**
 * Crea una reserva como superadmin (puede forzar reservas)
 */
export const createSuperadminReservationService = async (
  clienteId: string,
  restauranteId: string,
  fecha: Date,
  horario: string,
  numAdultos: number,
  numNinos: number,
  pedidosEspeciales?: string
) => {
  return await ReservationRepository.createReservation({
    usuario: toObjectId(clienteId),
    restaurante: toObjectId(restauranteId),
    fecha,
    horario,
    numAdultos,
    numNinos,
    pedidosEspeciales,
    estado: "Confirmada",
  });
};

// 📌 Obtener una reserva por ID
export const getReservationByIdService = async (id: string) => {
  return await ReservationRepository.getReservationById(id);
};

// 📌 Obtener todas las reservas (solo superadmins)
export const getAllReservationsService = async () => {
  return await ReservationRepository.getAllReservations();
};

// 📌 Obtener reservas de un usuario
export const getReservationsByUserService = async (userId: string) => {
  return await ReservationRepository.getReservationsByUser(userId);
};

// 📌 Obtener reservas de un restaurante
export const getReservationsByRestaurantService = async (restaurantId: string) => {
  return await ReservationRepository.getReservationsByRestaurant(restaurantId);
};

// 📌 Obtener reservas según el rol del usuario
export const getReservationsByIdService = async (userId: string, role: string) => {
  return await ReservationRepository.getReservationsByRole(userId, role);
};

// 📌 Actualizar una reserva
export const updateReservationService = async (reservationId: string, updatedData: Partial<IReservation>) => {
  return await ReservationRepository.updateReservation(reservationId, updatedData);
};

// 📌 Cancelar una reserva
export const cancelReservationService = async (reservationId: string) => {
  return await ReservationRepository.cancelReservation(reservationId);
};
