import { ContainerModule } from "inversify";
import { IReservationAnalyticsService } from "../interfaces/IReservationAnalyticsService";
import { ReservationAnalyticsService } from "../services/reservasAnaliticas.service";
import { ReservationStatsRepository } from "../repositories/reservationStats.repository";
import { RESERVATIONS_ANAYLITICS_TYPES } from "../types/reservationAnalytics.types";
import { IReservationStatsRepository } from "../interfaces/IReservationStatsRepository";

export const reservationAnalyticsModule = new ContainerModule((bind) => {
bind<IReservationStatsRepository>(RESERVATIONS_ANAYLITICS_TYPES.IReservationStatsRepository).to(ReservationStatsRepository);
bind<IReservationAnalyticsService>(RESERVATIONS_ANAYLITICS_TYPES.IReservationAnalyticsService).to(ReservationAnalyticsService);
}
);