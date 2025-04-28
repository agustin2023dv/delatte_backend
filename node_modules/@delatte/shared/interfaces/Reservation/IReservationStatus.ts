/**
 * Estado de la reserva y fecha de creación.
 */
export interface IReservationStatus {
  estado: "Pasada" | "Confirmada" | "Cancelada";
  fechaCreacion: Date;
}
