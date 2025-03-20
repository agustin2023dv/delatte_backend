import { IReservation } from "@delatte/shared/interfaces/Reservation/IReservation";


export interface IReservationAnalyticsService {
    getReservasDiarias(): Promise<IReservation[]>;
    getReservasSemanales(): Promise<IReservation[]>;
    getReservasMensuales(): Promise<IReservation[]>;
    getReservasPorRestaurante(): Promise<IReservation[]>;
    getReservasCanceladas(): Promise<IReservation[]>;
    getTopHorarios(): Promise<ITopHorarios[]>;}

export interface ITopHorarios {
    horario: string;
    cantidadReservas: number;
}