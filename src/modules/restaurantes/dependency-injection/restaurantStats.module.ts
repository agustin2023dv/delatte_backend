import { ContainerModule } from "inversify";
import { RESTAURANT_STATS_TYPES } from "../types/restaurantStats.types";
import { IRestaurantStatsRepository } from "../interfaces/IRestaurantStatsRepository";
import { IRestaurantStatsService } from "../interfaces/IRestaurantStatsService";
import { RestaurantStatsRepository } from "../repositories/restaurantStats.repository";
import { RestaurantAnalyticsService } from "../services/restauranteAnaliticas.service";

export const restaurantStatsModule = new ContainerModule((bind) => {
  bind<IRestaurantStatsRepository>(RESTAURANT_STATS_TYPES.IRestaurantStatsRepository).to(RestaurantStatsRepository);
  bind<IRestaurantStatsService>(RESTAURANT_STATS_TYPES.IRestaurantStatsService).to(RestaurantAnalyticsService);

});
