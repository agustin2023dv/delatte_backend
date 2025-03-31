import { inject, injectable } from "inversify";
import { IReservation } from "@delatte/shared/interfaces";
import { ICreateReservationDTO } from "@delatte/shared/dtos";
import { IReservationRegisterService } from "../interfaces/IReservationRegisterService";
import { RESERVATIONS_BASE_TYPES } from "../types/reservationBase.types";
import { IReservationBaseRepository } from "../interfaces/IReservationBaseRepository";
import { ReservationTransformer } from "src/transformers/reservation.transformer";

@injectable()
export class ReservationRegistrationService implements IReservationRegisterService {
  constructor(
    @inject(RESERVATIONS_BASE_TYPES.IReservationBaseRepository)
    private reservationRepo: IReservationBaseRepository
  ) {}

  async createCustomerReservation(dto: ICreateReservationDTO): Promise<IReservation> {
    const restaurant = await this.reservationRepo.restaurantExists(dto.restauranteId!);
    if (!restaurant) throw new Error("Restaurante no encontrado");

    const reservation = ReservationTransformer.fromDTO(dto);
    return await this.reservationRepo.createReservation(reservation);
  }

  async createManagerReservation(managerId: string, dto: ICreateReservationDTO): Promise<IReservation> {
    const restaurant = await this.reservationRepo.restaurantExists(dto.restauranteId!);
    if (!restaurant) throw new Error("Restaurante no encontrado");

    const isManager = restaurant.management.managerPrincipal?.toString() === managerId;
    const isCoManager = restaurant.management.coManagers?.some(
      (coManager: any) => coManager.toString() === managerId
    );

    if (!isManager && !isCoManager) {
      throw new Error("No puedes crear reservas en un restaurante que no administras");
    }

    const reservation = ReservationTransformer.fromDTO(dto);
    return await this.reservationRepo.createReservation(reservation);
  }

  async createSuperadminReservation(dto: ICreateReservationDTO): Promise<IReservation> {
    const reservation = ReservationTransformer.fromDTO(dto);
    return await this.reservationRepo.createReservation(reservation);
  }
}
