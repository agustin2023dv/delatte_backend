import {
    IDailyReservationsDTO,
    IWeeklyReservationsDTO,
    IMonthlyReservationsDTO,
    IReservationsByRestaurantDTO,
    ICancelledReservationDTO,
    ITopReservationHoursDTO
  } from "@delatte/shared/dtos";
  
  export interface IReservationAnalyticsRepository {
    getReservasDiarias(): Promise<IDailyReservationsDTO[]>;
    getReservasSemanales(): Promise<IWeeklyReservationsDTO[]>;
    getReservasMensuales(): Promise<IMonthlyReservationsDTO[]>;
    getReservasPorRestaurante(): Promise<IReservationsByRestaurantDTO[]>;
    getReservasCanceladas(): Promise<ICancelledReservationDTO[]>;
    getTopHorarios(): Promise<ITopReservationHoursDTO[]>;
  }
  