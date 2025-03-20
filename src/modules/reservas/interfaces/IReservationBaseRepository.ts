import { IReservation } from "@delatte/shared/interfaces/Reservation/IReservation";
import { IRestaurant } from "@delatte/shared/interfaces/Restaurant/IRestaurant";


export interface IReservationBaseRepository {
    createReservation(reservationData: Partial<IReservation>): Promise<IReservation>;
    getReservationById(id: string): Promise<IReservation | null>;
    getAllReservations(): Promise<IReservation[]>;
    getReservationsByUser(userId: string): Promise<IReservation[]>;
    getReservationsByRestaurant(restaurantId: string): Promise<IReservation[]>;
    getReservationsByRole(userId: string, role: string): Promise<IReservation[]>;
    updateReservation(reservationId: string, updatedData: Partial<IReservation>): Promise<IReservation | null>;
    cancelReservation(reservationId: string): Promise<IReservation | null>;
    restaurantExists(restaurantId: string): Promise<IRestaurant | null>;
}