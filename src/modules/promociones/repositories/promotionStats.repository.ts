import { injectable } from "inversify";
import { IPromotionStatsRepository } from "../interfaces/IPromotionStatsRepository";
import Promotion from "../models/Promocion.model";
import Reservation from "../../reservas/models/Reservation.model";

@injectable()
export class PromotionStatsRepository implements IPromotionStatsRepository {

    async getPromotionCount() {
        return await Promotion.aggregate([
            {
                $group: {
                    _id: "$estado",
                    cantidad: { $sum: 1 },
                },
            },
        ]);
    }

    async getTopRestaurantsByPromotions() {
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

    async getPromotionImpact() {
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

    async getIneffectivePromotions() {
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
