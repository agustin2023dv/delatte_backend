import { ReviewStatsRepository } from "../repositories/reviewStats.repository";

export class ReviewAnalyticsService {
  
  //* 📊 Resumen de reviews positivas vs negativas en el tiempo
  static async getReviewSentimentStats() {
    return await ReviewStatsRepository.getReviewSentimentStats();
  }

  //* 📊 Promedio de calificaciones (agrupado por restaurante si se solicita)
  static async getAverageReview(groupBy?: string) {
    return await ReviewStatsRepository.getAverageReview(groupBy);
  }

  //* 📊 Listado de reviews reportadas como ofensivas o falsas
  static async getReportedReviews() {
    return await ReviewStatsRepository.getReportedReviews();
  }
}
