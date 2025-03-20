import { ContainerModule } from "inversify";
import { IReviewStatsRepository } from "../interfaces/IReviewStatsRepository";
import { IReviewAnalyticsService } from "../interfaces/IReviewAnalyticsService";
import { REVIEWS_ANALYTICS_TYPES } from "../types/reviewAnalytics.types";
import { ReviewAnalyticsService } from "../services/resenasAnaliticas.service";
import { ReviewStatsRepository } from "../repositories/reviewStats.repository";

export const reviewsAnalyticsModule = new ContainerModule((bind) => {
bind<IReviewStatsRepository>(REVIEWS_ANALYTICS_TYPES.IReviewStatsRepository).to(ReviewStatsRepository);
bind<IReviewAnalyticsService>(REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsService).to(ReviewAnalyticsService);})