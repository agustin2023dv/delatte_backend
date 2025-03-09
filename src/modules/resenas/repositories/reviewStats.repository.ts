import { Review } from "../models/Review.model";

export class ReviewStatsRepository {

  // 📊 Resumen de reviews positivas vs negativas en el tiempo
  static async getReviewSentimentStats() {
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

  // 📊 Promedio de calificaciones (agrupado por restaurante si se solicita)
  static async getAverageReview(groupBy?: string) {
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

  // 📊 Listado de reviews reportadas como ofensivas o falsas
  static async getReportedReviews() {
    return await Review.find({ status: "reported" }) 
      .populate("usuario", "nombre apellido email")
      .populate("restaurante", "nombre direccion")
      .sort({ fecha: -1 });
  }
}
