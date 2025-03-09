import mongoose from "mongoose";
import { IReview } from "@delatte/shared/interfaces";
import Restaurant from "../../restaurantes/models/Restaurant.model";
import { Review } from "../models/Review.model";

export class ReviewRepository {
  
  // 📌 CREAR una reseña
  static async createReview(
    userId: string,
    reviewData: { restaurante: string; calificacion: number; comentario: string }
  ) {
    const { restaurante, calificacion, comentario } = reviewData;

    if (!restaurante || !calificacion || !comentario) {
      throw new Error("Todos los campos requeridos deben ser proporcionados.");
    }

    const restauranteExistente = await Restaurant.findById(restaurante);
    if (!restauranteExistente) {
      throw new Error("El restaurante no existe.");
    }

    const review = new Review({
      restaurante: new mongoose.Types.ObjectId(restaurante),
      usuario: new mongoose.Types.ObjectId(userId),
      calificacion,
      comentario,
      fecha: new Date(),
    });

    return await review.save();
  }

  // 📌 OBTENER todas las reseñas (con paginación)
  static async getAllReviews(page = 1, limit = 10) {
    return await Review.find()
      .populate("usuario", "nombre apellido email")
      .populate("restaurante", "nombre direccion")
      .skip((page - 1) * limit)
      .limit(limit);
  }

  // 📌 OBTENER reseñas de un restaurante
  static async getReviewsByRestaurant(restaurantId: string) {
    return await Review.find({ restaurante: restaurantId })
      .populate("usuario", "nombre apellido email")
      .sort({ fecha: -1 });
  }

  // 📌 OBTENER reseñas de un usuario
  static async getReviewsByUser(userId: string) {
    return await Review.find({ usuario: userId })
      .populate("restaurante", "nombre direccion")
      .sort({ fecha: -1 });
  }

  // 📌 ACTUALIZAR una reseña
  static async updateReview(reviewId: string, reviewData: Partial<IReview>) {
    return await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
  }

  // 📌 ELIMINAR una reseña
  static async deleteReview(reviewId: string) {
    return await Review.findByIdAndDelete(reviewId);
  }
}
