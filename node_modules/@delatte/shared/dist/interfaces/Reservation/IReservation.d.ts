import { IReservationDetails } from "./IReservationDetails";
import { IReservationIdentity } from "./IReservationIdentity";
import { IReservationStatus } from "./IReservationStatus";
/**
 * Interfaz principal que representa una reserva en la base de datos.
 * Combina las interfaces de identidad, detalles y estado de la reserva.
 */
export interface IReservation extends Document, IReservationIdentity, IReservationDetails, IReservationStatus {
}
//# sourceMappingURL=IReservation.d.ts.map