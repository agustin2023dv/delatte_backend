import { ContainerModule } from "inversify";
import { IReservationAnalyticsService } from "../interfaces/IReservationAnalyticsService";
import { IReservationAnalyticsRepository } from "../interfaces/IReservationAnalyticsRepository";
import { ReservationAnalyticsRepository } from "../repositories/reservationAnalytics.repository";
import { ReservationAnalyticsService } from "../services/reservationAnalytics.service";
import { RESERVATIONS_ANALYTICS_TYPES } from "../types/reservationAnalytics.types";

export const reservationAnalyticsModule = new ContainerModule((bind) => {
bind<IReservationAnalyticsRepository>(RESERVATIONS_ANALYTICS_TYPES.IReservationAnalyticsRepository).to(ReservationAnalyticsRepository);
bind<IReservationAnalyticsService>(RESERVATIONS_ANALYTICS_TYPES.IReservationAnalyticsService).to(ReservationAnalyticsService);
}
);