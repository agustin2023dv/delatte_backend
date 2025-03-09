import { Request, Response } from "express";
import {
  createPromotionService,
  getPromotionsByRestaurantService,
  updatePromotionService,
  deletePromotionService,
} from "../services/promocion.service";

// ✅ Crear una nueva promoción
export const createPromotionController = async (req: Request, res: Response) => {
  try {
    const newPromotion = await createPromotionService(req.body);
    res.status(201).json(newPromotion);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la promoción", error });
  }
};

// ✅ Obtener todas las promociones activas de un restaurante
export const getPromotionsController = async (req: Request, res: Response) => {
  try {
    const promotions = await getPromotionsByRestaurantService(req.params.id);
    res.status(200).json(promotions);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener promociones", error });
  }
};

// ✅ Actualizar una promoción específica
export const updatePromotionController = async (req: Request, res: Response) => {
  try {
    const updatedPromotion = await updatePromotionService(req.params.promoId, req.body);
    res.status(200).json(updatedPromotion);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la promoción", error });
  }
};

// ✅ Eliminar una promoción específica
export const deletePromotionController = async (req: Request, res: Response) => {
  try {
    await deletePromotionService(req.params.promoId);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la promoción", error });
  }
};
