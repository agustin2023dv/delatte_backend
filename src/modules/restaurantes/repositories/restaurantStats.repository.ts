import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.model";
import { IRestaurantStatsRepository } from "../interfaces/IRestaurantStatsRepository";

@injectable()
export class RestaurantStatsRepository implements IRestaurantStatsRepository {
  async getTopRestaurants() {
    return await Restaurant.find()
      .sort({ totalReservas: -1, calificacion: -1 })
      .limit(10);
  }

  async getWorstPerformingRestaurants() {
    return await Restaurant.find()
      .sort({ totalReservas: 1, calificacion: 1 })
      .limit(10);
  }

  async getNewRestaurants() {
    return await Restaurant.find()
      .sort({ _id: -1 }) 
      .limit(10);
  }

  async getSaturatedRestaurants() {
    try {
      return await Restaurant.aggregate([
        {
          $project: {
            nombre: 1,
            direccion: 1,
            totalReservas: 1,
            capacidadMesas: 1,
            capacidadTotal: {
              $sum: {
                $map: {
                  input: "$capacidadMesas",
                  as: "mesa",
                  in: { $multiply: ["$$mesa.cantidad", "$$mesa.personasPorMesa"] },
                },
              },
            },
          },
        },
        {
          $addFields: {
            saturacion: {
              $cond: [
                { $gt: ["$capacidadTotal", 0] },
                { $divide: ["$totalReservas", "$capacidadTotal"] },
                0,
              ],
            },
          },
        },
        { $sort: { saturacion: -1 } },
        { $limit: 10 },
      ]);
    } catch (error) {
      console.error("Error al calcular restaurantes saturados:", error);
      throw error;
    }
  }
}
