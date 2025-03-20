import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { IReservationAnalyticsService } from "../interfaces/IReservationAnalyticsService";
import { RESERVATIONS_ANAYLITICS_TYPES } from "../types/reservationAnalytics.types";

@controller("/api/v1/reservations/analytics")
export class ReservationAnalyticsController {
    constructor(
        @inject(RESERVATIONS_ANAYLITICS_TYPES.IReservationAnalyticsService)
        private reservationAnalyticsService: IReservationAnalyticsService
    ) {}

    @httpGet("/daily")
    async getReservasDiarias(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasDiarias();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas diarias", error });
        }
    }

    @httpGet("/weekly")
    async getReservasSemanales(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasSemanales();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas semanales", error });
        }
    }

    @httpGet("/monthly")
    async getReservasMensuales(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasMensuales();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas mensuales", error });
        }
    }

    @httpGet("/by-restaurant")
    async getReservasPorRestaurante(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasPorRestaurante();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas por restaurante", error });
        }
    }

    @httpGet("/canceled")
    async getReservasCanceladas(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasCanceladas();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas canceladas", error });
        }
    }

    @httpGet("/top-hours")
    async getTopHorarios(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getTopHorarios();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los horarios con más reservas", error });
        }
    }
}
