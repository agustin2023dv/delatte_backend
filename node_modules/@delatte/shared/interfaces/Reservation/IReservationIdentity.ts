import { Types } from "mongoose";

/**
 * Interfaz que representa la identidad de una reserva.
 * Contiene referencias a los documentos relacionados con el restaurante y el usuario.
 */
export interface IReservationIdentity {
  /**
   * ID del restaurante asociado a la reserva.
   * @example new Types.ObjectId("64b8f5c2e4b0f5c2e4b0f5c2")
   */
  restaurante: Types.ObjectId;

  /**
   * ID del usuario que realizó la reserva.
   * @example new Types.ObjectId("64b8f5c2e4b0f5c2e4b0f5c3")
   */
  usuario: Types.ObjectId;
}