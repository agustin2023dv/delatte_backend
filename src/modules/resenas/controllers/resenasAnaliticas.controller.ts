import { Request, Response } from "express";
import {
  getReviewSentimentStatsService,
  getAverageReviewService,
  getReportedReviewsService
} from "../services/resenasAnaliticas.service";

// 📊 Obtener resumen de reviews positivas vs negativas en el tiempo
export const getReviewSentimentStatsController = async (req: Request, res: Response) => {
  try {
    const data = await getReviewSentimentStatsService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estadísticas de sentimiento", error });
  }
};

// 📊 Obtener promedio de calificaciones (agrupado por restaurante si se solicita)
export const getAverageReviewController = async (req: Request, res: Response) => {
  try {
    const groupBy = req.query.groupBy as string; // Puede ser 'restaurant' u otro criterio en el futuro
    const data = await getAverageReviewService(groupBy);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el promedio de calificaciones", error });
  }
};

// 📊 Obtener listado de reviews reportadas como ofensivas o falsas
export const getReportedReviewsController = async (req: Request, res: Response) => {
  try {
    const data = await getReportedReviewsService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reviews reportadas", error });
  }
};
