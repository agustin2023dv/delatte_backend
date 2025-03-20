import { injectable, inject } from "inversify";
import { IReservationAnalyticsService, ITopHorarios } from "../interfaces/IReservationAnalyticsService";
import { IReservationStatsRepository } from "../interfaces/IReservationStatsRepository";
import { RESERVATIONS_ANAYLITICS_TYPES } from "../types/reservationAnalytics.types";
import { IReservation } from "@delatte/shared/interfaces/Reservation/IReservation";

@injectable()
export class ReservationAnalyticsService implements IReservationAnalyticsService {
    
    constructor(
        @inject(RESERVATIONS_ANAYLITICS_TYPES.IReservationStatsRepository)
        private reservationStatsRepo: IReservationStatsRepository
    ) {}

    async getReservasDiarias(): Promise<IReservation[]> {
        return await this.reservationStatsRepo.getReservasDiarias();
    }

    async getReservasSemanales(): Promise<IReservation[]> {
        return await this.reservationStatsRepo.getReservasSemanales();
    }

    async getReservasMensuales(): Promise<IReservation[]> {
        return await this.reservationStatsRepo.getReservasMensuales();
    }


    async getReservasPorRestaurante(): Promise<IReservation[]> {
        return await this.reservationStatsRepo.getReservasPorRestaurante();
    }

    async getReservasCanceladas(): Promise<IReservation[]> {
        return await this.reservationStatsRepo.getReservasCanceladas();
    }

    async getTopHorarios(): Promise<ITopHorarios[]> {
        return await this.reservationStatsRepo.getTopHorarios();
    }
}
