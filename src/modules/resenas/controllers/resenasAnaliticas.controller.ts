import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
<<<<<<< Updated upstream
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
=======
import { inject } from "inversify";
import { IReviewAnalyticsService } from "../interfaces/IReviewAnalyticsService";
import { REVIEWS_ANALYTICS_TYPES } from "../types/reviewAnalytics.types";

@controller("/api/v1/reviews/analytics")
export class ReviewAnalyticsController extends BaseHttpController{
    constructor(
        @inject(REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsService)
        private reviewAnalyticsService: IReviewAnalyticsService
    ) {
        super();
    }

    /**
     * @swagger
     * /api/v1/reviews/analytics/stats/sentiment:
     *   get:
     *     summary: Obtener estadísticas de sentimiento en reviews
     *     description: Retorna un análisis de sentimiento de las reseñas de la plataforma.
     *     tags:
     *       - Review Analytics
     *     responses:
     *       200:
     *         description: Estadísticas obtenidas con éxito.
     *       500:
     *         description: Error al obtener estadísticas de sentimiento.
     */
    @httpGet("/stats/sentiment")
    async getReviewSentimentStats(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.reviewAnalyticsService.getReviewSentimentStats();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener estadísticas de sentimiento", error });
        }
    }

    /**
     * @swagger
     * /api/v1/reviews/analytics/stats/average:
     *   get:
     *     summary: Obtener promedio de calificaciones en reseñas
     *     description: Devuelve el promedio de calificaciones, agrupado por el parámetro especificado.
     *     tags:
     *       - Review Analytics
     *     parameters:
     *       - in: query
     *         name: groupBy
     *         schema:
     *           type: string
     *         description: Parámetro por el cual agrupar las calificaciones (por ejemplo, "restaurant").
     *     responses:
     *       200:
     *         description: Promedio de calificaciones obtenido con éxito.
     *       500:
     *         description: Error al obtener el promedio de calificaciones.
     */
    @httpGet("/stats/average")
    async getAverageReview(req: Request, res: Response): Promise<void> {
        try {
            const groupBy = req.query.groupBy as string; 
            const data = await this.reviewAnalyticsService.getAverageReview(groupBy);
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el promedio de calificaciones", error });
        }
    }

    /**
     * @swagger
     * /api/v1/reviews/analytics/reviews/reported:
     *   get:
     *     summary: Obtener reseñas reportadas
     *     description: Devuelve un listado de las reseñas reportadas como ofensivas o falsas.
     *     tags:
     *       - Review Analytics
     *     responses:
     *       200:
     *         description: Lista de reseñas reportadas obtenida con éxito.
     *       500:
     *         description: Error al obtener reseñas reportadas.
     */
    @httpGet("/reviews/reported")
    async getReportedReviews(req: Request, res: Response): Promise<void> {
        try {
            const data = await this.reviewAnalyticsService.getReportedReviews();
            res.json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reviews reportadas", error });
        }
    }
}
>>>>>>> Stashed changes
