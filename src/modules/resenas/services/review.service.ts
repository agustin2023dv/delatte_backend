import { ReviewRepository } from "../repositories/review.repository";
import { IReview } from "@delatte/shared/interfaces";

// 📌 CREAR una reseña
export const createReviewService = async (
  userId: string,
  reviewData: { restaurante: string; calificacion: number; comentario: string }
) => {
  return await ReviewRepository.createReview(userId, reviewData);
};

// 📌 OBTENER todas las reseñas (con paginación)
export const getAllReviewsService = async (page = 1, limit = 10) => {
  return await ReviewRepository.getAllReviews(page, limit);
};

// 📌 OBTENER reseñas de un restaurante
export const getReviewsByRestaurantService = async (restaurantId: string) => {
  return await ReviewRepository.getReviewsByRestaurant(restaurantId);
};

// 📌 OBTENER reseñas de un usuario
export const getReviewsByUserService = async (userId: string) => {
  return await ReviewRepository.getReviewsByUser(userId);
};

// 📌 ACTUALIZAR una reseña
export const updateReviewService = async (reviewId: string, reviewData: Partial<IReview>) => {
  return await ReviewRepository.updateReview(reviewId, reviewData);
};

// 📌 ELIMINAR una reseña
export const deleteReviewService = async (reviewId: string) => {
  return await ReviewRepository.deleteReview(reviewId);
};
