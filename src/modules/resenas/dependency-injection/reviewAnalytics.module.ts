import { ContainerModule } from "inversify";
import { IReviewAnalyticsService } from "../interfaces/IReviewAnalyticsService";
import { REVIEWS_ANALYTICS_TYPES } from "../types/reviewAnalytics.types";
import { ReviewAnalyticsService } from "../services/reviewAnalytics.service";
import { IReviewAnalyticsRepository } from "../interfaces/IReviewAnalyticsRepository";
import { ReviewAnalyticsRepository } from "../repositories/reviewAnalytics.repository";

export const reviewsAnalyticsModule = new ContainerModule((bind) => {
bind<IReviewAnalyticsRepository>(REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsRepository).to(ReviewAnalyticsRepository);
bind<IReviewAnalyticsService>(REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsService).to(ReviewAnalyticsService);})