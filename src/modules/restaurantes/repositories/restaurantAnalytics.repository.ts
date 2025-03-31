import { IRestaurantAnalyticsRepository } from "../interfaces/IRestaurantAnalyticsRepository";
import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.model";
import {
  INewRestaurantStatsDTO,
  ISaturatedRestaurantStatsDTO,
  ITopRestaurantStatsDTO,
  IWorstRestaurantStatsDTO,
} from "@delatte/shared/dtos";
import { RestaurantAnalyticsTransformer } from "src/transformers/restaurant.analytics.transformer";

@injectable()
export class RestaurantAnalyticsRepository implements IRestaurantAnalyticsRepository {
  async getTopRestaurants(): Promise<ITopRestaurantStatsDTO[]> {
    const restaurants = await Restaurant.find()
      .sort({ "stats.totalReservas": -1, "stats.calificacion": -1 })
      .limit(10)
      .lean();

    return restaurants.map(RestaurantAnalyticsTransformer.toTopDTO);
  }

  async getWorstPerformingRestaurants(): Promise<IWorstRestaurantStatsDTO[]> {
    const restaurants = await Restaurant.find()
      .sort({ "stats.totalReservas": 1, "stats.calificacion": 1 })
      .limit(10)
      .lean();

    return restaurants.map(RestaurantAnalyticsTransformer.toWorstDTO);
  }

  async getNewRestaurants(): Promise<INewRestaurantStatsDTO[]> {
    const restaurants = await Restaurant.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .lean();

    return restaurants.map(RestaurantAnalyticsTransformer.toNewDTO);
  }

  async getSaturatedRestaurants(): Promise<ISaturatedRestaurantStatsDTO[]> {
    const result = await Restaurant.aggregate([
      {
        $project: {
          nombre: "$identity.nombre",
          direccion: "$location.direccion",
          totalReservas: "$stats.totalReservas",
          capacidadMesas: "$capacity.capacidadMesas",
          capacidadTotal: {
            $sum: {
              $map: {
                input: "$capacity.capacidadMesas",
                as: "mesa",
                in: {
                  $multiply: ["$$mesa.cantidad", "$$mesa.personasPorMesa"]
                }
              }
            }
          }
        }
      },
      {
        $addFields: {
          saturacion: {
            $cond: [
              { $gt: ["$capacidadTotal", 0] },
              { $divide: ["$totalReservas", "$capacidadTotal"] },
              0
            ]
          }
        }
      },
      { $sort: { saturacion: -1 } },
      { $limit: 10 }
    ]);

    return result.map(RestaurantAnalyticsTransformer.toSaturatedDTO);
  }
}
