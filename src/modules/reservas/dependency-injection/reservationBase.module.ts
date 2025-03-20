import { ContainerModule } from "inversify";
import { IReservationBaseService } from "../interfaces/IReservationBaseService";
import { IReservationBaseRepository } from "../interfaces/IReservationBaseRepository";
import { ReservationBaseService } from "../services/reservasBase.service";
import { RESERVATIONS_BASE_TYPES } from "../types/reservationBase.types";
import { IReservationRegisterService } from "../interfaces/IReservationRegisterService";
import { ReservationRegistrationService } from "../services/reservasRegistration.service";
import { ReservationBaseRepository } from "../repositories/reservationBase.repository";


export const reservationBaseModule = new ContainerModule((bind) => {
    bind<IReservationBaseRepository>(RESERVATIONS_BASE_TYPES.IReservationBaseRepository).to(ReservationBaseRepository);
    bind<IReservationBaseService>(RESERVATIONS_BASE_TYPES.IReservationBaseService).to(ReservationBaseService);
    bind<IReservationRegisterService>(RESERVATIONS_BASE_TYPES.IReservationRegisterService).to(ReservationRegistrationService);
}

);
