import { ReviewRepository } from "../repositories/review.repository";
import { IReview } from "@delatte/shared/interfaces";

export class ReviewService {
  
  //* 📌 CREAR una reseña
  static async createReview(
    userId: string,
    reviewData: { restaurante: string; calificacion: number; comentario: string }
  ) {
    return await ReviewRepository.createReview(userId, reviewData);
  }

  //* 📌 OBTENER todas las reseñas (con paginación)
  static async getAllReviews(page = 1, limit = 10) {
    return await ReviewRepository.getAllReviews(page, limit);
  }

  //* 📌 OBTENER reseñas de un restaurante
  static async getReviewsByRestaurant(restaurantId: string) {
    return await ReviewRepository.getReviewsByRestaurant(restaurantId);
  }

  //* 📌 OBTENER reseñas de un usuario
  static async getReviewsByUser(userId: string) {
    return await ReviewRepository.getReviewsByUser(userId);
  }

  //* 📌 ACTUALIZAR una reseña
  static async updateReview(reviewId: string, reviewData: Partial<IReview>) {
    return await ReviewRepository.updateReview(reviewId, reviewData);
  }

  //* 📌 ELIMINAR una reseña
  static async deleteReview(reviewId: string) {
    return await ReviewRepository.deleteReview(reviewId);
  }
}
