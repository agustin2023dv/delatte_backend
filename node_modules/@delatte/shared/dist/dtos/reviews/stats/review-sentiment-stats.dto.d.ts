/**
 * DTO para representar estadísticas de sentimiento por mes.
 */
export interface IReviewSentimentStatsDTO {
    /**
     * Mes en formato YYYY-MM
     */
    _id: string;
    /**
     * Total de reviews con calificación ≥ 4
     */
    positivas: number;
    /**
     * Total de reviews con calificación ≤ 2
     */
    negativas: number;
    /**
     * Total de reviews con calificación = 3
     */
    neutras: number;
    /**
     * Total de reviews ese mes
     */
    total: number;
}
//# sourceMappingURL=review-sentiment-stats.dto.d.ts.map