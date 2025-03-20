import { inject, injectable } from "inversify";
import { IRestaurantStatsService } from "../interfaces/IRestaurantStatsService";
import { IRestaurantStatsRepository } from "../interfaces/IRestaurantStatsRepository";
import { RESTAURANT_STATS_TYPES } from "../types/restaurantStats.types";

<<<<<<< Updated upstream
const restaurantStatsRepo = new RestaurantStatsRepository();

//* 📊 Servicio para obtener los mejores restaurantes
export const getTopRestaurantsService = async () => {
  return await restaurantStatsRepo.getTopRestaurants();
};

//* 📊 Servicio para obtener los peores restaurantes
export const getWorstPerformingRestaurantsService = async () => {
  return await restaurantStatsRepo.getWorstPerformingRestaurants();
};

//* 📊 Servicio para obtener los restaurantes más nuevos
export const getNewRestaurantsService = async () => {
  return await restaurantStatsRepo.getNewRestaurants();
};

//* 📊 Servicio para obtener los restaurantes más saturados
export const getSaturatedRestaurantsService = async () => {
  return await restaurantStatsRepo.getSaturatedRestaurants();
};
=======

@injectable()
export class RestaurantAnalyticsService implements IRestaurantStatsService {
  constructor(
    @inject(RESTAURANT_STATS_TYPES.IRestaurantStatsRepository) 
    private restaurantStatsRepo: IRestaurantStatsRepository
  ) {}

  async getTopRestaurants() {
    return await this.restaurantStatsRepo.getTopRestaurants();
  }

  async getWorstPerformingRestaurants() {
    return await this.restaurantStatsRepo.getWorstPerformingRestaurants();
  }

  async getNewRestaurants() {
    return await this.restaurantStatsRepo.getNewRestaurants();
  }

  async getSaturatedRestaurants() {
    return await this.restaurantStatsRepo.getSaturatedRestaurants();
  }
}
>>>>>>> Stashed changes
