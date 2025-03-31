import { INewRestaurantStatsDTO, ISaturatedRestaurantStatsDTO, 
  ITopRestaurantStatsDTO, IWorstRestaurantStatsDTO } from "@delatte/shared/dtos";


export interface IRestaurantAnalyticsRepository {
  getTopRestaurants(): Promise<ITopRestaurantStatsDTO[]>;
  getWorstPerformingRestaurants(): Promise<IWorstRestaurantStatsDTO[]>;
  getNewRestaurants(): Promise<INewRestaurantStatsDTO[]>;
  getSaturatedRestaurants(): Promise<ISaturatedRestaurantStatsDTO[]>;
}
