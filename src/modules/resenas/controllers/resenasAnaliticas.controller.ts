import { Request, Response } from "express";
import { ReviewAnalyticsService } from "../services/resenasAnaliticas.service";

// 📊 Obtener resumen de reviews positivas vs negativas en el tiempo
export const getReviewSentimentStatsController = async (req: Request, res: Response) => {
  try {
    const data = await ReviewAnalyticsService.getReviewSentimentStats();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estadísticas de sentimiento", error });
  }
};

// 📊 Obtener promedio de calificaciones (agrupado por restaurante si se solicita)
export const getAverageReviewController = async (req: Request, res: Response) => {
  try {
    const groupBy = req.query.groupBy as string; 
    const data = await ReviewAnalyticsService.getAverageReview(groupBy);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el promedio de calificaciones", error });
  }
};

// 📊 Obtener listado de reviews reportadas como ofensivas o falsas
export const getReportedReviewsController = async (req: Request, res: Response) => {
  try {
    const data = await ReviewAnalyticsService.getReportedReviews();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reviews reportadas", error });
  }
};
