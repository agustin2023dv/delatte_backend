import { injectable } from "inversify";
import "reflect-metadata";
import Restaurant from "../../restaurantes/models/Restaurant.model";
import { IRestaurantSearchRepository } from "../interfaces/IRestaurantSearchRespository";

@injectable()
export class RestaurantSearchRepository implements IRestaurantSearchRepository {
  async searchByName(query: string, limit: number): Promise<any> {
    try {
      return await Restaurant.find({ nombre: { $regex: `^${query}`, $options: "i" } })
        .sort({ nombre: 1 })
        .limit(limit);
    } catch (error) {
      console.error("Error en la búsqueda de restaurantes:", error);
      throw error;
    }
  }
}
