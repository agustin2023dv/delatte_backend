"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewController = exports.updateReviewController = exports.getReviewsByUserController = exports.getReviewsByRestaurantController = exports.getAllReviewsController = exports.createReviewController = void 0;
const review_service_1 = require("../services/review.service");
// 🔹 CREAR una reseña
const createReviewController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado." });
            return;
        }
        const newReview = await (0, review_service_1.createReviewService)(req.user._id, req.body);
        res.status(201).json({ message: "Reseña creada con éxito", review: newReview });
    }
    catch (error) {
        console.error("Error en createReviewController:", error);
        res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
    }
};
exports.createReviewController = createReviewController;
// 🔹 OBTENER todas las reseñas (para administración)
const getAllReviewsController = async (req, res) => {
    try {
        const reviews = await (0, review_service_1.getAllReviewsService)();
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener todas las reseñas." });
    }
};
exports.getAllReviewsController = getAllReviewsController;
// 🔹 OBTENER reseñas de un restaurante
const getReviewsByRestaurantController = async (req, res) => {
    try {
        const reviews = await (0, review_service_1.getReviewsByRestaurantService)(req.params.id);
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las reseñas del restaurante." });
    }
};
exports.getReviewsByRestaurantController = getReviewsByRestaurantController;
// 🔹 OBTENER reseñas por usuario
const getReviewsByUserController = async (req, res) => {
    try {
        const reviews = await (0, review_service_1.getReviewsByUserService)(req.params.userId);
        res.status(200).json(reviews);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener las reseñas del usuario." });
    }
};
exports.getReviewsByUserController = getReviewsByUserController;
// 🔹 ACTUALIZAR una reseña
const updateReviewController = async (req, res) => {
    try {
        const updatedReview = await (0, review_service_1.updateReviewService)(req.params.reviewId, req.body);
        if (!updatedReview) {
            res.status(404).json({ message: "Reseña no encontrada." });
            return;
        }
        res.status(200).json(updatedReview);
    }
    catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
    }
};
exports.updateReviewController = updateReviewController;
// 🔹 ELIMINAR una reseña
const deleteReviewController = async (req, res) => {
    try {
        await (0, review_service_1.deleteReviewService)(req.params.reviewId);
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar la reseña." });
    }
};
exports.deleteReviewController = deleteReviewController;
