import { Document } from "mongoose";
import { IRestaurantInfo, IUserInfo } from "./IReservationIdentity";
import { IReservationData } from "./IReservationDetails";
import { IReservationStatus } from "./IReservationStatus";

/**
 * Interfaz principal que representa una reserva completa en la base de datos.
 * Agrupa la identidad, los detalles y el estado de la reserva.
 */
export interface IReservation extends Document {
  restaurantInfo: IRestaurantInfo;
  userInfo: IUserInfo;
  reservationData: IReservationData;
  reservationStatus: IReservationStatus;
}
