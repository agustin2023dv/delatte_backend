import { IUpdateReservationDTO } from "@delatte/shared/dtos";
import { IReservation } from "@delatte/shared/interfaces";

export interface IReservationBaseService {
  getReservationById(id: string): Promise<IReservation | null>;
  getAllReservations(): Promise<IReservation[]>;
  getReservationsByUser(userId: string): Promise<IReservation[]>;
  getReservationsByRestaurant(restaurantId: string): Promise<IReservation[]>;
  getReservationsById(userId: string, role: string): Promise<IReservation[]>;
  updateReservation(reservationId: string, updatedData: IUpdateReservationDTO): Promise<IReservation | null>;
  cancelReservation(reservationId: string): Promise<IReservation | null>;
}
