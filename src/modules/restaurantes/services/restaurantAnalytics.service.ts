import { IRestaurantAnalyticsService } from "../interfaces/IRestaurantAnalyticsService";
import { IRestaurantAnalyticsRepository } from "../interfaces/IRestaurantAnalyticsRepository";
import { RESTAURANT_ANALYTICS_TYPES } from "../types/restaurantAnalytics.types";
import {
  INewRestaurantStatsDTO,
  ISaturatedRestaurantStatsDTO,
  ITopRestaurantStatsDTO,
  IWorstRestaurantStatsDTO,
} from "@delatte/shared/dtos";
import { inject, injectable } from "inversify";

@injectable()
export class RestaurantAnalyticsService implements IRestaurantAnalyticsService {
  constructor(
    @inject(RESTAURANT_ANALYTICS_TYPES.IRestaurantAnalyticsRepository)
    private restaurantStatsRepo: IRestaurantAnalyticsRepository
  ) {}

  async getTopRestaurants(): Promise<ITopRestaurantStatsDTO[]> {
    return await this.restaurantStatsRepo.getTopRestaurants();
  }

  async getWorstPerformingRestaurants(): Promise<IWorstRestaurantStatsDTO[]> {
    return await this.restaurantStatsRepo.getWorstPerformingRestaurants();
  }

  async getNewRestaurants(): Promise<INewRestaurantStatsDTO[]> {
    return await this.restaurantStatsRepo.getNewRestaurants();
  }

  async getSaturatedRestaurants(): Promise<ISaturatedRestaurantStatsDTO[]> {
    return await this.restaurantStatsRepo.getSaturatedRestaurants();
  }
}
