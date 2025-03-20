/**
 * Interfaz que representa los detalles de una reserva.
 * Contiene información específica sobre la fecha, horario y preferencias del cliente.
 */
export interface IReservationDetails {
  /**
   * Fecha de la reserva.
   * @example new Date("2023-12-25")
   */
  fecha: Date;

  /**
   * Horario de la reserva.
   * @example "19:00"
   */
  horario: string;

  /**
   * Número de adultos incluidos en la reserva.
   */
  numAdultos: number;

  /**
   * Número de niños incluidos en la reserva.
   */
  numNinos: number;

  /**
   * Pedidos especiales o notas adicionales del cliente (opcional).
   * @example "Mesa cerca de la ventana"
   */
  pedidosEspeciales?: string;
}
