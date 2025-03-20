"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantPermissionsModule = void 0;
const inversify_1 = require("inversify");
const restaurantePermisos_service_1 = require("../services/restaurantePermisos.service");
const restaurantPermissions_repository_1 = require("../repositories/restaurantPermissions.repository");
const restaurantPermissions_types_1 = require("../types/restaurantPermissions.types");
exports.restaurantPermissionsModule = new inversify_1.ContainerModule((bind) => {
    bind(restaurantPermissions_types_1.RESTAURANT_PERMISSIONS_TYPES.IRestaurantPermissionsRepository).to(restaurantPermissions_repository_1.RestaurantPermissionsRepository);
    bind(restaurantPermissions_types_1.RESTAURANT_PERMISSIONS_TYPES.IRestaurantPermissionsService).to(restaurantePermisos_service_1.RestaurantPermissionsService);
});
