"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationAnalyticsModule = void 0;
const inversify_1 = require("inversify");
const reservasAnaliticas_service_1 = require("../services/reservasAnaliticas.service");
const reservationStats_repository_1 = require("../repositories/reservationStats.repository");
const reservationAnalytics_types_1 = require("../types/reservationAnalytics.types");
exports.reservationAnalyticsModule = new inversify_1.ContainerModule((bind) => {
    bind(reservationAnalytics_types_1.RESERVATIONS_ANAYLITICS_TYPES.IReservationStatsRepository).to(reservationStats_repository_1.ReservationStatsRepository);
    bind(reservationAnalytics_types_1.RESERVATIONS_ANAYLITICS_TYPES.IReservationAnalyticsService).to(reservasAnaliticas_service_1.ReservationAnalyticsService);
});
