import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { z } from "zod";
import { IReservationAnalyticsService } from "../interfaces/IReservationAnalyticsService";
import { RESERVATIONS_ANALYTICS_TYPES } from "../types/reservationAnalytics.types";

@controller("/api/v1/reservations/analytics")
export class ReservationAnalyticsController {
  constructor(
    @inject(RESERVATIONS_ANALYTICS_TYPES.IReservationAnalyticsService)
    private reservationAnalyticsService: IReservationAnalyticsService
  ) {}

  @httpGet("/daily")
  async getReservasDiarias(req: Request, res: Response) {
    const schema = z.array(
      z.object({
        _id: z.string(), // Fecha en formato YYYY-MM-DD
        total: z.number(), // Total de reservas para ese día
      })
    );

    try {
      const data = await this.reservationAnalyticsService.getReservasDiarias();
      const validatedData = schema.parse(data); // Validar los datos con Zod
      res.status(200).json(validatedData);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener reservas diarias", error });
    }
  }

  @httpGet("/weekly")
  async getReservasSemanales(req: Request, res: Response) {
    const schema = z.array(
      z.object({
        _id: z.number(), // Número de semana
        total: z.number(), // Total de reservas para esa semana
      })
    );

    try {
      const data = await this.reservationAnalyticsService.getReservasSemanales();
      const validatedData = schema.parse(data); // Validar los datos con Zod
      res.status(200).json(validatedData);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener reservas semanales", error });
    }
  }

  @httpGet("/monthly")
  async getReservasMensuales(req: Request, res: Response) {
    const schema = z.array(
      z.object({
        _id: z.string(), // Mes en formato YYYY-MM
        total: z.number(), // Total de reservas para ese mes
      })
    );

    try {
      const data = await this.reservationAnalyticsService.getReservasMensuales();
      const validatedData = schema.parse(data); // Validar los datos con Zod
      res.status(200).json(validatedData);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener reservas mensuales", error });
    }
  }

  @httpGet("/by-restaurant")
  async getReservasPorRestaurante(req: Request, res: Response) {
    const schema = z.array(
      z.object({
        _id: z.string(), // ID del restaurante
        total: z.number(), // Total de reservas para ese restaurante
      })
    );

    try {
      const data = await this.reservationAnalyticsService.getReservasPorRestaurante();
      const validatedData = schema.parse(data); // Validar los datos con Zod
      res.status(200).json(validatedData);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener reservas por restaurante", error });
    }
  }

  @httpGet("/canceled")
  async getReservasCanceladas(req: Request, res: Response) {
    const schema = z.array(
      z.object({
        motivo: z.string(), // Motivo de la cancelación
        fecha: z.string(), // Fecha de la reserva en formato YYYY-MM-DD
      })
    );

    try {
      const data = await this.reservationAnalyticsService.getReservasCanceladas();
      const validatedData = schema.parse(data); 
      res.status(200).json(validatedData);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener reservas canceladas", error });
    }
  }

  @httpGet("/top-hours")
  async getTopHorarios(req: Request, res: Response) {
    const schema = z.array(
      z.object({
        _id: z.string(), // Horario (por ejemplo, "18:00")
        total: z.number(), // Total de reservas para ese horario
      })
    );

    try {
      const data = await this.reservationAnalyticsService.getTopHorarios();
      const validatedData = schema.parse(data); // Validar los datos con Zod
      res.status(200).json(validatedData);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los horarios con más reservas", error });
    }
  }
}