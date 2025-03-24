/**
 * DTO para actualizar una reseña existente.
 */
export interface IUpdateReviewDTO {
    /**
     * Nueva calificación del restaurante (opcional).
     */
    calificacion?: number;
  
    /**
     * Comentario actualizado (opcional).
     */
    comentario?: string;
  }
  