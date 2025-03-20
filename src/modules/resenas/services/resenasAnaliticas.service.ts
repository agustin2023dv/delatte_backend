import { injectable, inject } from "inversify";
import { IReviewAnalyticsService } from "../interfaces/IReviewAnalyticsService";
import { IReviewStatsRepository } from "../interfaces/IReviewStatsRepository";
import { REVIEWS_ANALYTICS_TYPES } from "../types/reviewAnalytics.types";

@injectable()
export class ReviewAnalyticsService implements IReviewAnalyticsService {

    constructor(@inject(REVIEWS_ANALYTICS_TYPES.IReviewStatsRepository) private reviewStatsRepo: IReviewStatsRepository) {}

    async getReviewSentimentStats() {
        return await this.reviewStatsRepo.getReviewSentimentStats();
    }

    async getAverageReview(groupBy?: string) {
        return await this.reviewStatsRepo.getAverageReview(groupBy);
    }

    async getReportedReviews() {
        return await this.reviewStatsRepo.getReportedReviews();
    }
}
