import { inject, injectable } from "inversify";
import { IReservationBaseService } from "../interfaces/IReservationBaseService";
import { IReservationBaseRepository } from "../interfaces/IReservationBaseRepository";
import { RESERVATIONS_BASE_TYPES } from "../types/reservationBase.types";
import { IReservation } from "@delatte/shared/interfaces";
import { IUpdateReservationDTO } from "@delatte/shared/dtos";

@injectable()
export class ReservationBaseService implements IReservationBaseService {
  constructor(
    @inject(RESERVATIONS_BASE_TYPES.IReservationBaseRepository)
    private reservationRepo: IReservationBaseRepository
  ) {}

  async getReservationById(id: string): Promise<IReservation | null> {
    return await this.reservationRepo.getReservationById(id);
  }

  async getAllReservations(): Promise<IReservation[]> {
    return await this.reservationRepo.getAllReservations();
  }

  async getReservationsByUser(userId: string): Promise<IReservation[]> {
    return await this.reservationRepo.getReservationsByUser(userId);
  }

  async getReservationsByRestaurant(restaurantId: string): Promise<IReservation[]> {
    return await this.reservationRepo.getReservationsByRestaurant(restaurantId);
  }

  async getReservationsById(userId: string, role: string): Promise<IReservation[]> {
    return await this.reservationRepo.getReservationsByRole(userId, role);
  }

  async updateReservation(
    reservationId: string,
    updatedData: IUpdateReservationDTO
  ): Promise<IReservation | null> {
    return await this.reservationRepo.updateReservation(reservationId, updatedData);
  }

  async cancelReservation(reservationId: string): Promise<IReservation | null> {
    return await this.reservationRepo.cancelReservation(reservationId);
  }
}
