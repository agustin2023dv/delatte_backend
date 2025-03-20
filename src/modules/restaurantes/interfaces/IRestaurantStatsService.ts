import { IRestaurant } from "@delatte/shared/interfaces";

export interface IRestaurantStatsService {
    getTopRestaurants(): Promise<IRestaurant[]>;
    getWorstPerformingRestaurants(): Promise<IRestaurant[]>;
    getNewRestaurants(): Promise<IRestaurant[]>;
    getSaturatedRestaurants(): Promise<IRestaurant[]>;
  }