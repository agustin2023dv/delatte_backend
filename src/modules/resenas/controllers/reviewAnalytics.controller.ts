import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { IReviewAnalyticsService } from "../interfaces/IReviewAnalyticsService";
import { REVIEWS_ANALYTICS_TYPES } from "../types/reviewAnalytics.types";
import {
  IReviewSentimentStatsDTO,
  IAverageReviewRatingDTO,
  IReportedReviewDTO
} from "@delatte/shared/dtos";
import { z } from "zod";

// Validador del parámetro groupBy
const groupBySchema = z.enum(["restaurant", "user"]).optional();

@controller("/api/v1/reviews/analytics")
export class ReviewAnalyticsController extends BaseHttpController {
  constructor(
    @inject(REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsService)
    private reviewAnalyticsService: IReviewAnalyticsService
  ) {
    super();
  }

  @httpGet("/stats/sentiment")
  async getReviewSentimentStats(req: Request, res: Response) {
    try {
      const data: IReviewSentimentStatsDTO[] =
        await this.reviewAnalyticsService.getReviewSentimentStats();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener estadísticas de sentimiento", error });
    }
  }

  @httpGet("/stats/average")
  async getAverageReview(req: Request, res: Response) {
    const parsed = groupBySchema.safeParse(req.query.groupBy);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Parámetro 'groupBy' inválido. Usa 'restaurant' o 'user'.",
        errors: parsed.error.flatten().fieldErrors,
      });
    }

    try {
      const data: IAverageReviewRatingDTO[] =
        await this.reviewAnalyticsService.getAverageReview(parsed.data);
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el promedio de calificaciones", error });
    }
  }

  @httpGet("/reviews/reported")
  async getReportedReviews(req: Request, res: Response) {
    try {
      const data: IReportedReviewDTO[] =
        await this.reviewAnalyticsService.getReportedReviews();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener reviews reportadas", error });
    }
  }
}
