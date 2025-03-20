export interface IReviewStatsRepository {
    getReviewSentimentStats(): Promise<any>;
    getAverageReview(groupBy?: string): Promise<any>;
    getReportedReviews(): Promise<any>;
}