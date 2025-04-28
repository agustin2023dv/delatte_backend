import { IReservationResponseDTO, IUpdateReservationDTO } from "@delatte/shared/dtos";
import { IReservation, IRestaurant } from "@delatte/shared/interfaces";
import { ReservationMongoInput } from "../types/reservation.types";

export interface IReservationBaseRepository {
  createReservation(reservationData: ReservationMongoInput): Promise<IReservation>;
  getReservationById(id: string): Promise<IReservation | null>;
  getAllReservations(): Promise<IReservation[]>;
  getReservationsByUser(userId: string): Promise<IReservation[]>;
  getReservationsByRestaurant(restaurantId: string): Promise<IReservation[]>;
  getReservationsByRole(userId: string, role: string): Promise<IReservation[]>;
  updateReservation(reservationId: string, updatedData: IUpdateReservationDTO): Promise<IReservation | null>;
  cancelReservation(reservationId: string): Promise<IReservation | null>;
  restaurantExists(restaurantId: string): Promise<IRestaurant | null>;

  findFutureByUser(userId: string): Promise<IReservationResponseDTO[]>;
  findPastByUser(userId: string): Promise<IReservationResponseDTO[]>;
}

