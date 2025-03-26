/**
 * DTO para representar el promedio de calificación agrupado.
 * Puede usarse para agrupar por restaurante o por usuario.
 */
export interface IAverageReviewRatingDTO {
    /**
     * ID del restaurante o del usuario
     */
    _id: string;
    /**
     * Promedio de calificación
     */
    promedioCalificacion: number;
}
//# sourceMappingURL=average-review-rating.dto.d.ts.map