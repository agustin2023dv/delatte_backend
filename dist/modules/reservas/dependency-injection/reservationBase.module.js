"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationBaseModule = void 0;
const inversify_1 = require("inversify");
const reservasBase_service_1 = require("../services/reservasBase.service");
const reservationBase_types_1 = require("../types/reservationBase.types");
const reservasRegistration_service_1 = require("../services/reservasRegistration.service");
const reservationBase_repository_1 = require("../repositories/reservationBase.repository");
exports.reservationBaseModule = new inversify_1.ContainerModule((bind) => {
    bind(reservationBase_types_1.RESERVATIONS_BASE_TYPES.IReservationBaseRepository).to(reservationBase_repository_1.ReservationBaseRepository);
    bind(reservationBase_types_1.RESERVATIONS_BASE_TYPES.IReservationBaseService).to(reservasBase_service_1.ReservationBaseService);
    bind(reservationBase_types_1.RESERVATIONS_BASE_TYPES.IReservationRegisterService).to(reservasRegistration_service_1.ReservationRegistrationService);
});
