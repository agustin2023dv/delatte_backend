import { injectable } from "inversify";
import { IPromotionAnalyticsRepository } from "../interfaces/IPromotionAnalyticsRepository";
import Promotion from "../models/Promotion.model";
import Reservation from "../../reservas/models/Reservation.model";
import {
  IPromotionCountByStatusDTO,
  ITopRestaurantsByPromotionsDTO,
  IPromotionImpactDTO,
  IIneffectivePromotionDTO,
} from "@delatte/shared/dtos"; 

@injectable()
export class PromotionAnalyticsRepository implements IPromotionAnalyticsRepository {

  async getPromotionCount(): Promise<IPromotionCountByStatusDTO[]> {
    return await Promotion.aggregate([
      {
        $group: {
          _id: "$estado",
          cantidad: { $sum: 1 },
        },
      },
    ]);
  }

  async getTopRestaurantsByPromotions(): Promise<ITopRestaurantsByPromotionsDTO[]> {
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

  async getPromotionImpact(): Promise<IPromotionImpactDTO[]> {
    return await Reservation.aggregate([
      {
        $match: {
          promocionAplicada: { $exists: true, $ne: null },
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

  async getIneffectivePromotions(): Promise<IIneffectivePromotionDTO[]> {
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
      {
        $project: {
          _id: 1,
          titulo: 1,
          fechaInicio: 1,
          fechaFin: 1,
          descuento: 1,
          estado: 1,
          fechaCreacion: 1,
        },
      },
    ]);
  }
}
