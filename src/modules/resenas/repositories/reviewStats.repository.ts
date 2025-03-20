import { injectable } from "inversify";
import { Review } from "../models/Review.model";
import { IReviewStatsRepository } from "../interfaces/IReviewStatsRepository";

@injectable()
export class ReviewStatsRepository implements IReviewStatsRepository {

    async getReviewSentimentStats() {
        return await Review.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$fecha" } },
                    positivas: { $sum: { $cond: [{ $gte: ["$calificacion", 4] }, 1, 0] } },
                    negativas: { $sum: { $cond: [{ $lte: ["$calificacion", 2] }, 1, 0] } },
                    neutras: { $sum: { $cond: [{ $eq: ["$calificacion", 3] }, 1, 0] } },
                    total: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
    }

    async getAverageReview(groupBy?: string) {
        const matchStage = groupBy === "restaurant" ? { restaurante: "$restaurante" } : { usuario: "$usuario" };

        return await Review.aggregate([
            {
                $group: {
                    _id: matchStage,
                    promedioCalificacion: { $avg: "$calificacion" }
                }
            },
            { $sort: { promedioCalificacion: -1 } }
        ]);
    }

    async getReportedReviews() {
        return await Review.find({ status: "reported" })
            .populate("usuario", "nombre apellido email")
            .populate("restaurante", "nombre direccion")
            .sort({ fecha: -1 });
    }
}
