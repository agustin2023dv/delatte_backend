import { inject, injectable } from "inversify";
import { IRestaurantStatsService } from "../interfaces/IRestaurantStatsService";
import { IRestaurantStatsRepository } from "../interfaces/IRestaurantStatsRepository";
import { RESTAURANT_STATS_TYPES } from "../types/restaurantStats.types";


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
