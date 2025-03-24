import { injectable } from "inversify";
import "reflect-metadata";
import Restaurant from "../../restaurantes/models/Restaurant.model";
import { IRestaurantSearchRepository } from "../interfaces/IRestaurantSearchRespository";
import { ISearchRestaurantsByNameDTO } from "@delatte/shared/dtos";

@injectable()
export class RestaurantSearchRepository implements IRestaurantSearchRepository {
  async searchRestaurantByName({ q, limit = 10 }: ISearchRestaurantsByNameDTO): Promise<any>  {
    try {
      return await Restaurant.find({ nombre: { $regex: `^${q}`, $options: "i" } })
        .sort({ nombre: 1 })
        .limit(limit);
    } catch (error) {
      console.error("Error en la búsqueda de restaurantes:", error);
      throw error;
    }
  }
}
