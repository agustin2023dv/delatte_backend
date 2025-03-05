"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewService = exports.updateReviewService = exports.getReviewsByUserService = exports.getReviewsByRestaurantService = exports.getAllReviewsService = exports.createReviewService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Restaurant_model_1 = __importDefault(require("../../restaurantes/models/Restaurant.model"));
const Review_model_1 = require("../models/Review.model");
// 🔹 CREAR una reseña
const createReviewService = async (userId, reviewData) => {
    const { restaurante, calificacion, comentario } = reviewData;
    if (!restaurante || !calificacion || !comentario) {
        throw new Error("Todos los campos requeridos deben ser proporcionados.");
    }
    const restauranteExistente = await Restaurant_model_1.default.findById(restaurante);
    if (!restauranteExistente) {
        throw new Error("El restaurante no existe.");
    }
    const review = new Review_model_1.Review({
        restaurante: new mongoose_1.default.Types.ObjectId(restaurante),
        usuario: new mongoose_1.default.Types.ObjectId(userId),
        calificacion,
        comentario,
        fecha: new Date(),
    });
    return await review.save();
};
exports.createReviewService = createReviewService;
// 🔹 OBTENER todas las reseñas (con paginación)
const getAllReviewsService = async (page = 1, limit = 10) => {
    return await Review_model_1.Review.find()
        .populate("usuario", "nombre apellido email")
        .populate("restaurante", "nombre direccion")
        .skip((page - 1) * limit)
        .limit(limit);
};
exports.getAllReviewsService = getAllReviewsService;
// 🔹 OBTENER reseñas de un restaurante
const getReviewsByRestaurantService = async (restaurantId) => {
    return await Review_model_1.Review.find({ restaurante: restaurantId })
        .populate("usuario", "nombre apellido email")
        .sort({ fecha: -1 });
};
exports.getReviewsByRestaurantService = getReviewsByRestaurantService;
// 🔹 OBTENER reseñas de un usuario
const getReviewsByUserService = async (userId) => {
    return await Review_model_1.Review.find({ usuario: userId })
        .populate("restaurante", "nombre direccion")
        .sort({ fecha: -1 });
};
exports.getReviewsByUserService = getReviewsByUserService;
// 🔹 ACTUALIZAR una reseña
const updateReviewService = async (reviewId, reviewData) => {
    return await Review_model_1.Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
};
exports.updateReviewService = updateReviewService;
// 🔹 ELIMINAR una reseña
const deleteReviewService = async (reviewId) => {
    return await Review_model_1.Review.findByIdAndDelete(reviewId);
};
exports.deleteReviewService = deleteReviewService;
