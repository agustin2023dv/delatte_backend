import { injectable, inject } from "inversify";
import { IReviewAnalyticsService } from "../interfaces/IReviewAnalyticsService";
import { IReviewStatsRepository } from "../interfaces/IReviewStatsRepository";
import { REVIEWS_ANALYTICS_TYPES } from "../types/reviewAnalytics.types";

<<<<<<< Updated upstream
// 📊 Resumen de reviews positivas vs negativas en el tiempo
export const getReviewSentimentStatsService = async () => {
  return await ReviewStatsRepository.getReviewSentimentStats();
};

// 📊 Promedio de calificaciones (agrupado por restaurante si se solicita)
export const getAverageReviewService = async (groupBy?: string) => {
  return await ReviewStatsRepository.getAverageReview(groupBy);
};

// 📊 Listado de reviews reportadas como ofensivas o falsas
export const getReportedReviewsService = async () => {
  return await ReviewStatsRepository.getReportedReviews();
};
=======
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
>>>>>>> Stashed changes
