/**
 * Interfaz que representa el estado de una reserva.
 * Incluye el estado actual de la reserva y la fecha de creación.
 */
export interface IReservationStatus {
    /**
     * Estado actual de la reserva.
     * Puede ser "Pasada", "Confirmada" o "Cancelada".
     * @example "Confirmada"
     */
    estado: "Pasada" | "Confirmada" | "Cancelada";
    /**
     * Fecha y hora en que se creó la reserva.
     * @example new Date("2023-12-01T10:00:00Z")
     */
    fechaCreacion: Date;
}
//# sourceMappingURL=IReservationStatus.d.ts.map