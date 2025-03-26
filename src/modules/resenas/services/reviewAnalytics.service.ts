import { injectable, inject } from "inversify";
import { IReviewAnalyticsService } from "../interfaces/IReviewAnalyticsService";
import { IReviewAnalyticsRepository } from "../interfaces/IReviewAnalyticsRepository";
import { REVIEWS_ANALYTICS_TYPES } from "../types/reviewAnalytics.types";
import {
  IReviewSentimentStatsDTO,
  IAverageReviewRatingDTO,
  IReportedReviewDTO,
} from "@delatte/shared/dtos";

@injectable()
export class ReviewAnalyticsService implements IReviewAnalyticsService {

  constructor(
    @inject(REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsRepository)
    private reviewStatsRepo: IReviewAnalyticsRepository
  ) {}

  async getReviewSentimentStats(): Promise<IReviewSentimentStatsDTO[]> {
    return await this.reviewStatsRepo.getReviewSentimentStats();
  }

  async getAverageReview(groupBy?: string): Promise<IAverageReviewRatingDTO[]> {
    return await this.reviewStatsRepo.getAverageReview(groupBy);
  }

  async getReportedReviews(): Promise<IReportedReviewDTO[]> {
    return await this.reviewStatsRepo.getReportedReviews();
  }
}
