import {
    IReviewSentimentStatsDTO,
    IAverageReviewRatingDTO,
    IReportedReviewDTO,
  } from "@delatte/shared/dtos";
  
  export interface IReviewAnalyticsRepository {
    getReviewSentimentStats(): Promise<IReviewSentimentStatsDTO[]>;
    getAverageReview(groupBy?: string): Promise<IAverageReviewRatingDTO[]>;
    getReportedReviews(): Promise<IReportedReviewDTO[]>;
  }
  