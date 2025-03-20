
import { IReservation } from "@delatte/shared/interfaces/Reservation/IReservation";
import { ITopHorarios } from "./IReservationAnalyticsService";

export interface IReservationStatsRepository {
    getReservasDiarias(): Promise<IReservation[]>;
    getReservasSemanales(): Promise<IReservation[]>;
    getReservasMensuales(): Promise<IReservation[]>;
    getReservasPorRestaurante(): Promise<IReservation[]>;
    getReservasCanceladas(): Promise<IReservation[]>;
    getTopHorarios(): Promise<ITopHorarios[]>;
}