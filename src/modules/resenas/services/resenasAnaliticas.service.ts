import { Review } from "../models/Review.model";

// 📊 Resumen de reviews positivas vs negativas en el tiempo
export const getReviewSentimentStatsService = async () => {
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
};

// 📊 Promedio de calificaciones (agrupado por restaurante si se solicita)
export const getAverageReviewService = async (groupBy?: string) => {
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
};

// 📊 Listado de reviews reportadas como ofensivas o falsas
export const getReportedReviewsService = async () => {
  return await Review.find({ status: "reported" }) 
    .populate("usuario", "nombre apellido email")
    .populate("restaurante", "nombre direccion")
    .sort({ fecha: -1 });
};
