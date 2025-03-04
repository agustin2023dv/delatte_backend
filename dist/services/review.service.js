import mongoose from "mongoose";
import Restaurant from "../models/Restaurant.model";
import { Review } from "../models/Review.model";
// 🔹 CREAR una reseña
export const createReviewService = async (userId, reviewData) => {
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
};
// 🔹 OBTENER todas las reseñas (con paginación)
export const getAllReviewsService = async (page = 1, limit = 10) => {
    return await Review.find()
        .populate("usuario", "nombre apellido email")
        .populate("restaurante", "nombre direccion")
        .skip((page - 1) * limit)
        .limit(limit);
};
// 🔹 OBTENER reseñas de un restaurante
export const getReviewsByRestaurantService = async (restaurantId) => {
    return await Review.find({ restaurante: restaurantId })
        .populate("usuario", "nombre apellido email")
        .sort({ fecha: -1 });
};
// 🔹 OBTENER reseñas de un usuario
export const getReviewsByUserService = async (userId) => {
    return await Review.find({ usuario: userId })
        .populate("restaurante", "nombre direccion")
        .sort({ fecha: -1 });
};
// 🔹 ACTUALIZAR una reseña
export const updateReviewService = async (reviewId, reviewData) => {
    return await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
};
// 🔹 ELIMINAR una reseña
export const deleteReviewService = async (reviewId) => {
    return await Review.findByIdAndDelete(reviewId);
};
