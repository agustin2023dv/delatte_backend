/**
 * DTO para crear una nueva review de un restaurante.
 */
export interface ICreateReviewDTO {
    /**
     * ID del restaurante al que pertenece la reseña.
     * Solo requerido para superadmin y customer.
     */
    restauranteId?: string;
    /**
     * ID del usuario que realiza la review.
     * Solo requerido para superadmin.
     */
    usuarioId?: string;
    /**
     * Calificación del restaurante (1 a 5 estrellas).
     */
    calificacion: number;
    /**
     * Comentario de la review.
     */
    comentario: string;
}
//# sourceMappingURL=create-review.dto.d.ts.map