import { Request, Response } from "express";
import { PromotionAnalyticsService } from "../services/promocionAnaliticas.service";

// 📊 Cantidad de promociones por estado
export const getPromotionCountController = async (req: Request, res: Response) => {
  try {
    const stats = await PromotionAnalyticsService.getPromotionCount();
    if (!stats || stats.length === 0) {
      res.status(404).json({ message: "No se encontraron estadísticas de promociones" });
      return;
    }
    res.json(stats);
  } catch (error) {
    console.error("Error al obtener cantidad de promociones:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

// 📊 Restaurantes con más promociones
export const getTopRestaurantsByPromotionsController = async (req: Request, res: Response) => {
  try {
    const topRestaurants = await PromotionAnalyticsService.getTopRestaurantsByPromotions();
    if (!topRestaurants || topRestaurants.length === 0) {
      res.status(404).json({ message: "No se encontraron restaurantes con promociones" });
      return;
    }
    res.json(topRestaurants);
  } catch (error) {
    console.error("Error al obtener restaurantes con más promociones:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

// 📊 Impacto de promociones en reservas
export const getPromotionImpactController = async (req: Request, res: Response) => {
  try {
    const impact = await PromotionAnalyticsService.getPromotionImpact();
    if (!impact || impact.length === 0) {
      res.status(404).json({ message: "No se encontró impacto de promociones" });
      return;
    }
    res.json(impact);
  } catch (error) {
    console.error("Error al obtener impacto de promociones:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};

// 📊 Promociones inefectivas (sin reservas)
export const getIneffectivePromotionsController = async (req: Request, res: Response) => {
  try {
    const ineffectivePromos = await PromotionAnalyticsService.getIneffectivePromotions();
    if (!ineffectivePromos || ineffectivePromos.length === 0) {
      res.status(404).json({ message: "No se encontraron promociones inefectivas" });
      return;
    }
    res.json(ineffectivePromos);
  } catch (error) {
    console.error("Error al obtener promociones inefectivas:", error);
    res.status(500).json({ message: "Error interno del servidor", error });
  }
};
