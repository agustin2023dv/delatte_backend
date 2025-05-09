import { Request, Response, NextFunction } from "express";
import { AuthRequest } from '../../types';
import Restaurant from "../modules/restaurantes/models/Restaurant.model";
import Reservation from "../modules/reservas/models/Reservation.model";

/**
 * Middleware para verificar disponibilidad de reservas en base a la capacidad del restaurante
 */
export const checkDisponibilidadMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { restaurante, fecha, horario, numAdultos, numNinos } = req.body;

    // Verificar si el restaurante existe
    const restauranteData = await Restaurant.findById(restaurante);
    if (!restauranteData) {
      return next(new Error("El restaurante no existe."));
    }

    // Calcular la capacidad total del restaurante
    const capacidadMesas = restauranteData.capacity.capacidadMesas.reduce(
      (acc: { totalMesas: number; totalPersonas: number }, mesa: { cantidad: number; personasPorMesa: number }) => ({
        totalMesas: acc.totalMesas + mesa.cantidad,
        totalPersonas: acc.totalPersonas + mesa.cantidad * mesa.personasPorMesa,
      }),
      { totalMesas: 0, totalPersonas: 0 }
    );

    // Consultar reservas existentes en el mismo horario
    const reservasExistentes = await Reservation.find({
      "restaurantInfo.restaurante": restaurante,
      "reservationData.fecha": fecha,
      "reservationData.horario": horario,
    });

    const totalReservas = reservasExistentes.reduce(
      (acc, reserva) => ({
        totalAdultos: acc.totalAdultos + (reserva.reservationData?.cantidadAdultos ?? 0),
        totalNinos: acc.totalNinos + (reserva.reservationData?.cantidadNinios ?? 0),
      }),
      { totalAdultos: 0, totalNinos: 0 }
    );

    // Verificar disponibilidad de mesas y capacidad
    const totalPersonasActual = totalReservas.totalAdultos + totalReservas.totalNinos;
    const personasEnReservaActual = numAdultos + numNinos;

    if (reservasExistentes.length >= capacidadMesas.totalMesas) {
      return next(new Error("No hay disponibilidad de mesas en el horario seleccionado."));
    }

    if (totalPersonasActual + personasEnReservaActual > capacidadMesas.totalPersonas) {
      return next(new Error("No hay capacidad suficiente para la cantidad de personas en el horario seleccionado."));
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Middleware para validar los datos de la reserva antes de procesarla
 */
export const validateReservationData = (req: AuthRequest, res: Response, next: NextFunction): void => {
  try {
    const { dia, horario, numAdultos, numNinos } = req.body;

    if (!dia || !horario || numAdultos === undefined || numNinos === undefined) {
      res.status(400).json({ message: "Todos los campos de la reserva son obligatorios." });
      return;
    }

    // Validar que la fecha no sea en el pasado
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const fechaReserva = new Date(dia);

    if (fechaReserva < today) {
      res.status(400).json({ message: "La fecha de la reserva no puede ser en el pasado." });
      return;
    }

    // Validar el formato de horario (ej: "14:30")
    const horarioRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!horarioRegex.test(horario)) {
      res.status(400).json({ message: "El horario no es válido. Debe tener el formato HH:MM." });
      return;
    }

    // Validar que el número de adultos sea mayor que 0
    if (numAdultos <= 0) {
      res.status(400).json({ message: "Debe haber al menos un adulto en la reserva." });
      return;
    }

    // Validar que el número de niños no sea negativo
    if (numNinos < 0) {
      res.status(400).json({ message: "El número de niños no puede ser negativo." });
      return;
    }

    next();
  } catch (error) {
    console.error("❌ Error en validateReservationData:", error);
    res.status(500).json({ message: "Error en la validación de la reserva.", error });
  }
};
