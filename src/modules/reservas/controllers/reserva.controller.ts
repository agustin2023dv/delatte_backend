import { Request, Response } from "express";
import { ReservationService } from "../services/reservation.service";
import { AuthRequest } from "../../../../types";



// 📌 Obtener reservas de un restaurante
export const getReservationsByRestaurantController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: restaurantId } = req.params;
    const reservations = await ReservationService.getReservationsByRestaurant(restaurantId);

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo reservas del restaurante", error });
  }
};

// 📌 Obtener reservas de un usuario
export const getReservationsByUserController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: userId } = req.params;
    const reservations = await ReservationService.getReservationsByUser(userId);

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo reservas del usuario", error });
  }
};

// 📌 Obtener detalles de una reserva por ID
export const getReservationByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id: reservationId } = req.params;
    const reservation = await ReservationService.getReservationById(reservationId);

    if (!reservation) {
      res.status(404).json({ message: "Reserva no encontrada" });
      return;
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo la reserva", error });
  }
};


/**
 * Controlador para crear una reserva según el rol del usuario autenticado
 */
export const createReservationController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user.id; // ID del usuario autenticado
    const { restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales, clienteId } = req.body;
    const userRole = req.user.role; 

    if (!restauranteId || !fecha || !horario || numAdultos < 1) {
      res.status(400).json({ message: "Datos insuficientes para crear la reserva" });
      return;
    }

    let reserva;
    if (userRole === "customer") {
      if (clienteId && clienteId !== userId) {
        res.status(403).json({ message: "No puedes reservar en nombre de otro usuario" });
        return;
      }
      reserva = await ReservationService.createCustomerReservation(userId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
    } else if (userRole === "manager") {
      reserva = await ReservationService.createManagerReservation(userId, clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
    } else if (userRole === "superadmin") {
      reserva = await ReservationService.createSuperadminReservation(clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
    } else {
      res.status(403).json({ message: "No tienes permisos para crear una reserva" });
      return;
    }

    res.status(201).json(reserva);
  } catch (error) {
    console.error("Error al crear reserva:", error);
    res.status(500).json({ message: "Error interno al crear la reserva", error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

// 📌 Obtener reservas de un usuario autenticado
export const getUserReservationsController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const result = await ReservationService.getReservationsById(req.user.id, req.user.role);
    res.status(200).json(result.length ? result : { message: "No hay reservas disponibles." });
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

// 📌 Cancelar una reserva
export const cancelReservationController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reservation = await ReservationService.cancelReservation(req.params.id);
    res.status(200).json({ message: "Reserva cancelada con éxito.", reservation });
  } catch (error) {
    res.status(500).json({ message: "Error cancelando la reserva", error });
  }
};

// 📌 Modificar una reserva
export const updateReservationController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updatedReservation = await ReservationService.updateReservation(req.params.id, req.body);
    res.status(200).json({ message: "Reserva actualizada con éxito.", updatedReservation });
  } catch (error) {
    res.status(500).json({ message: "Error actualizando la reserva", error });
  }
};

// 📌 Obtener todas las reservas (solo superadmins)
export const getAllReservationsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const reservations = await ReservationService.getAllReservations();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo todas las reservas", error });
  }
};
