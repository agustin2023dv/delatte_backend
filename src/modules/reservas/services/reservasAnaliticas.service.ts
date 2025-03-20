import { injectable, inject } from "inversify";
import { IReservationAnalyticsService, ITopHorarios } from "../interfaces/IReservationAnalyticsService";
import { IReservationStatsRepository } from "../interfaces/IReservationStatsRepository";
import { RESERVATIONS_ANAYLITICS_TYPES } from "../types/reservationAnalytics.types";
import { IReservation } from "@delatte/shared/interfaces/Reservation/IReservation";

<<<<<<< Updated upstream
const reservationStatsRepo = new ReservationStatsRepository();

//* 📊 Servicio para obtener reservas por día
export const getReservasDiariasService = async () => {
  return await reservationStatsRepo.getReservasDiarias();
};

//* 📊 Servicio para obtener reservas por semana
export const getReservasSemanalesService = async () => {
  return await reservationStatsRepo.getReservasSemanales();
};

//* 📊 Servicio para obtener reservas por mes
export const getReservasMensualesService = async () => {
  return await reservationStatsRepo.getReservasMensuales();
};

//* 📊 Servicio para obtener reservas por localidad
export const getReservasPorLocalidadService = async () => {
  return await reservationStatsRepo.getReservasPorLocalidad();
};

//* 📊 Servicio para obtener reservas por restaurante
export const getReservasPorRestauranteService = async () => {
  return await reservationStatsRepo.getReservasPorRestaurante();
};

//* 📊 Servicio para obtener reservas canceladas con motivo
export const getReservasCanceladasService = async () => {
  return await reservationStatsRepo.getReservasCanceladas();
};

//* 📊 Servicio para obtener los horarios con más reservas
export const getTopHorariosService = async () => {
  return await reservationStatsRepo.getTopHorarios();
};

//* 📊 Servicio para predecir la demanda de reservas
export const getPronosticoReservasService = async () => {
  return await reservationStatsRepo.getPronosticoReservas();
};
=======
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
>>>>>>> Stashed changes
