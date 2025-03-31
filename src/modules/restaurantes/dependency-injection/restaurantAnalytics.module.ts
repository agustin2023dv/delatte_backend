import { ContainerModule } from "inversify";

import { RestaurantAnalyticsService } from "../services/restaurantAnalytics.service";
import { RESTAURANT_ANALYTICS_TYPES } from "../types/restaurantAnalytics.types";
import { IRestaurantAnalyticsService } from "../interfaces/IRestaurantAnalyticsService";
import { IRestaurantAnalyticsRepository } from "../interfaces/IRestaurantAnalyticsRepository";
import { RestaurantAnalyticsRepository } from "../repositories/restaurantAnalytics.repository";

export const restaurantAnalyticsModule = new ContainerModule((bind) => {
  bind<IRestaurantAnalyticsRepository>(RESTAURANT_ANALYTICS_TYPES.IRestaurantAnalyticsRepository).to(RestaurantAnalyticsRepository);
  bind<IRestaurantAnalyticsService>(RESTAURANT_ANALYTICS_TYPES.IRestaurantAnalyticsService).to(RestaurantAnalyticsService);

});
