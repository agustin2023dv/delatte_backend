import { injectable } from "inversify";
import { Review } from "../models/Review.model";
import { IReviewAnalyticsRepository } from "../interfaces/IReviewAnalyticsRepository";
import {
  IReviewSentimentStatsDTO,
  IAverageReviewRatingDTO,
  IReportedReviewDTO,
} from "@delatte/shared/dtos";
import { ReviewTransformer } from "src/transformers/review.transformer";

@injectable()
export class ReviewAnalyticsRepository implements IReviewAnalyticsRepository {

  async getReviewSentimentStats(): Promise<IReviewSentimentStatsDTO[]> {
    return await Review.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$fecha" } },
          positivas: { $sum: { $cond: [{ $gte: ["$calificacion", 4] }, 1, 0] } },
          negativas: { $sum: { $cond: [{ $lte: ["$calificacion", 2] }, 1, 0] } },
          neutras: { $sum: { $cond: [{ $eq: ["$calificacion", 3] }, 1, 0] } },
          total: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);
  }

  async getAverageReview(groupBy?: string): Promise<IAverageReviewRatingDTO[]> {
    const groupField = groupBy === "restaurant" ? "$restaurante" : "$usuario";

    return await Review.aggregate([
      {
        $group: {
          _id: groupField,
          promedioCalificacion: { $avg: "$calificacion" },
        },
      },
      { $sort: { promedioCalificacion: -1 } },
    ]);
  }

  async getReportedReviews(): Promise<IReportedReviewDTO[]> {
    const raw = await Review.find({ status: "reported" })
      .populate("usuario", "nombre apellido email")
      .populate("restaurante", "nombre direccion")
      .sort({ fecha: -1 })
      .lean();
  
    return ReviewTransformer.toManyReportedReviews(raw);
  }
  
}
