"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantStatsModule = void 0;
const inversify_1 = require("inversify");
const restaurantStats_types_1 = require("../types/restaurantStats.types");
const restaurantStats_repository_1 = require("../repositories/restaurantStats.repository");
const restauranteAnaliticas_service_1 = require("../services/restauranteAnaliticas.service");
exports.restaurantStatsModule = new inversify_1.ContainerModule((bind) => {
    bind(restaurantStats_types_1.RESTAURANT_STATS_TYPES.IRestaurantStatsRepository).to(restaurantStats_repository_1.RestaurantStatsRepository);
    bind(restaurantStats_types_1.RESTAURANT_STATS_TYPES.IRestaurantStatsService).to(restauranteAnaliticas_service_1.RestaurantAnalyticsService);
});
