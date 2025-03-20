import { IReview } from "@delatte/shared/interfaces/Review/IReview";


export interface IReviewAnalyticsService {
    getReviewSentimentStats(): Promise<any>;
    getAverageReview(groupBy?: string): Promise<any>;
    getReportedReviews(): Promise<IReview[]>;
}