import { Response } from "express";
import { ReviewService } from "../services/review.service";
import { AuthRequest } from "../../../../types";

// 🔹 CREAR una reseña
export const createReviewController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado." });
      return;
    }

    const newReview = await ReviewService.createReview(req.user._id, req.body);
    res.status(201).json({ message: "Reseña creada con éxito", review: newReview });
  } catch (error) {
    console.error("Error en createReviewController:", error);
    res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
  }
};

// 🔹 OBTENER todas las reseñas (para administración)
export const getAllReviewsController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { page, limit } = req.query;
    const reviews = await ReviewService.getAllReviews(Number(page) || 1, Number(limit) || 10);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener todas las reseñas." });
  }
};

// 🔹 OBTENER reseñas de un restaurante
export const getReviewsByRestaurantController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reviews = await ReviewService.getReviewsByRestaurant(req.params.id);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas del restaurante." });
  }
};

// 🔹 OBTENER reseñas por usuario
export const getReviewsByUserController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reviews = await ReviewService.getReviewsByUser(req.params.userId);
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las reseñas del usuario." });
  }
};

// 🔹 ACTUALIZAR una reseña
export const updateReviewController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updatedReview = await ReviewService.updateReview(req.params.reviewId, req.body);
    if (!updatedReview) {
      res.status(404).json({ message: "Reseña no encontrada." });
      return;
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: "Error interno del servidor." });
  }
};

// 🔹 ELIMINAR una reseña
export const deleteReviewController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    await ReviewService.deleteReview(req.params.reviewId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la reseña." });
  }
};
