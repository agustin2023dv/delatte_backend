/**
 * DTO para reportar una review como ofensiva, falsa, inapropiada, etc.
 */
export interface IReportReviewDTO {
    /**
     * ID del usuario que reporta la review.
     */
    userId: string;
    /**
     * Motivo del reporte (ej: "Lenguaje ofensivo", "Review falsa", etc.)
     */
    motivo: string;
}
//# sourceMappingURL=report-review.dto.d.ts.map