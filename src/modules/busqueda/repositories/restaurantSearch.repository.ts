import { injectable } from "inversify";
import "reflect-metadata";
import Restaurant from "../../restaurantes/models/Restaurant.model";
import { IRestaurantSearchRepository } from "../interfaces/IRestaurantSearchRespository";
import { ISearchRestaurantsByNameDTO } from "@delatte/shared/dtos";

@injectable()
export class RestaurantSearchRepository implements IRestaurantSearchRepository {
  async searchRestaurantByName({ q, limit = 10 }: ISearchRestaurantsByNameDTO): Promise<any> {
    try {
      return await Restaurant.find({ "identity.nombre": { $regex: `^${q}`, $options: "i" } })
        .sort({ "identity.nombre": 1 }) // Ordenar por el campo "identity.nombre"
        .limit(limit);
    } catch (error) {
      console.error("Error en la búsqueda de restaurantes:", error);
      throw error;
    }
  }
}
