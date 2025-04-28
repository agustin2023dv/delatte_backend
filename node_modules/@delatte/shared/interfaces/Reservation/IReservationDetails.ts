/**
 * Detalles de la reserva (fecha, horario, personas, notas).
 */
export interface IReservationData {
  fecha: Date;
  horario: string;
  cantidadAdultos: number;
  cantidadNinios: number;
  notas?: string;
}
