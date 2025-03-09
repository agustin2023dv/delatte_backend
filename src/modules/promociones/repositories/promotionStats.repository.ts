import Promotion from "../models/Promocion.model";
import Reservation from "../../reservas/models/Reservation.model";

export class PromotionStatsRepository {
  // 📊 Cantidad de promociones por estado
  static async getPromotionCount() {
    return await Promotion.aggregate([
      {
        $group: {
          _id: "$estado",
          cantidad: { $sum: 1 },
        },
      },
    ]);
  }

  // 📊 Restaurantes con más promociones creadas
  static async getTopRestaurantsByPromotions() {
    return await Promotion.aggregate([
      {
        $group: {
          _id: "$restaurante",
          totalPromociones: { $sum: 1 },
        },
      },
      { $sort: { totalPromociones: -1 } },
      { $limit: 5 },
    ]);
  }

  // 📊 Impacto de promociones en reservas
  static async getPromotionImpact() {
    return await Reservation.aggregate([
      {
        $match: {
          promocionAplicada: { $exists: true, $ne: null },
          fechaReserva: {
            $gte: new Date("2023-01-01"),
            $lte: new Date("2023-12-31"),
          },
        },
      },
      {
        $group: {
          _id: "$promocionAplicada",
          totalReservas: { $sum: 1 },
        },
      },
      { $sort: { totalReservas: -1 } },
    ]);
  }

  // 📊 Promociones inefectivas (sin reservas)
  static async getIneffectivePromotions() {
    return await Promotion.aggregate([
      {
        $lookup: {
          from: "reservas",
          localField: "_id",
          foreignField: "promocionAplicada",
          as: "reservasRelacionadas",
        },
      },
      {
        $match: {
          "reservasRelacionadas.0": { $exists: false },
        },
      },
      { $sort: { fechaInicio: -1 } },
    ]);
  }
}
