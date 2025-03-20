"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantLocationModule = void 0;
const inversify_1 = require("inversify");
const restauranteUbicacion_service_1 = require("../services/restauranteUbicacion.service");
const restaurantLocation_types_1 = require("../types/restaurantLocation.types");
const placesIntegration_service_1 = require("@modules/integrations/services/placesIntegration.service");
exports.restaurantLocationModule = new inversify_1.ContainerModule((bind) => {
    bind(restaurantLocation_types_1.RESTAURANT_LOCATION_TYPES.IRestaurantLocationService).to(restauranteUbicacion_service_1.RestaurantLocationService);
    bind(restaurantLocation_types_1.RESTAURANT_LOCATION_TYPES.IPlacesIntegrationService).to(placesIntegration_service_1.PlacesIntegrationService);
});
