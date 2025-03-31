import { inject, injectable } from "inversify";
import {
  IDailyReservationsDTO,
  IWeeklyReservationsDTO,
  IMonthlyReservationsDTO,
  IReservationsByRestaurantDTO,
  ICancelledReservationDTO,
  ITopReservationHoursDTO,
} from "@delatte/shared/dtos";
import { IReservationAnalyticsService } from "../interfaces/IReservationAnalyticsService";
import { IReservationAnalyticsRepository } from "../interfaces/IReservationAnalyticsRepository";
import { RESERVATIONS_ANALYTICS_TYPES } from "../types/reservationAnalytics.types";

@injectable()
export class ReservationAnalyticsService implements IReservationAnalyticsService {
  constructor(
    @inject(RESERVATIONS_ANALYTICS_TYPES.IReservationAnalyticsRepository)
    private reservationAnalyticsRepository: IReservationAnalyticsRepository
  ) {}

  /**
   * Obtiene las reservas diarias agrupadas por fecha.
   */
  async getReservasDiarias(): Promise<IDailyReservationsDTO[]> {
    return await this.reservationAnalyticsRepository.getReservasDiarias();
  }

  /**
   * Obtiene las reservas semanales agrupadas por número de semana.
   */
  async getReservasSemanales(): Promise<IWeeklyReservationsDTO[]> {
    return await this.reservationAnalyticsRepository.getReservasSemanales();
  }

  /**
   * Obtiene las reservas mensuales agrupadas por mes.
   */
  async getReservasMensuales(): Promise<IMonthlyReservationsDTO[]> {
    return await this.reservationAnalyticsRepository.getReservasMensuales();
  }

  /**
   * Obtiene las reservas agrupadas por restaurante.
   */
  async getReservasPorRestaurante(): Promise<IReservationsByRestaurantDTO[]> {
    return await this.reservationAnalyticsRepository.getReservasPorRestaurante();
  }

  /**
   * Obtiene las reservas canceladas con su motivo y fecha.
   */
  async getReservasCanceladas(): Promise<ICancelledReservationDTO[]> {
    return await this.reservationAnalyticsRepository.getReservasCanceladas();
  }

  /**
   * Obtiene los horarios más populares para reservas.
   */
  async getTopHorarios(): Promise<ITopReservationHoursDTO[]> {
    return await this.reservationAnalyticsRepository.getTopHorarios();
  }
}