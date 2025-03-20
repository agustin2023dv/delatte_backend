"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantSearchModule = void 0;
const inversify_1 = require("inversify");
const restaurantSearch_repository_1 = require("../repositories/restaurantSearch.repository");
const restaurantSearch_types_1 = require("../types/restaurantSearch.types");
const restaurantSearch_service_1 = require("../services/restaurantSearch.service");
exports.restaurantSearchModule = new inversify_1.ContainerModule((bind) => {
    bind(restaurantSearch_types_1.SEARCH_RESTAURANT_TYPES.IRestaurantSearchRepository).to(restaurantSearch_repository_1.RestaurantSearchRepository);
    bind(restaurantSearch_types_1.SEARCH_RESTAURANT_TYPES.IRestaurantSearchService).to(restaurantSearch_service_1.RestaurantSearchService);
});
