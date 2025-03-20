import { IRestaurant } from "@delatte/shared/interfaces";

export interface IRestaurantStatsRepository {
    getTopRestaurants(): Promise<IRestaurant[]>;
    getWorstPerformingRestaurants(): Promise<IRestaurant[]>;
    getNewRestaurants(): Promise<IRestaurant[]>;
    getSaturatedRestaurants(): Promise<IRestaurant[]>;
  }
  