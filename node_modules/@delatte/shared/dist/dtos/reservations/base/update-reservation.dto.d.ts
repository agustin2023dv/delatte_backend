/**
 * DTO de entrada para actualizar una reserva existente.
 */
export interface IUpdateReservationDTO {
    fecha?: string;
    horario?: string;
    cantidadAdultos?: number;
    cantidadNinios?: number;
    notas?: string;
    /**
     * Estado de la reserva: Pendiente, Confirmada o Cancelada.
     */
    estado?: "Pendiente" | "Confirmada" | "Cancelada";
}
//# sourceMappingURL=update-reservation.dto.d.ts.map