import { ReviewStatsRepository } from "../repositories/reviewStats.repository";

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
