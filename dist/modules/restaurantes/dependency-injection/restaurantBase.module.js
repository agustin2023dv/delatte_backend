"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantBaseModule = void 0;
const inversify_1 = require("inversify");
const restaurantBase_types_1 = require("../types/restaurantBase.types");
const restaurantBase_repository_1 = require("../repositories/restaurantBase.repository");
const restaurantBase_service_1 = require("../services/restaurantBase.service");
const restaurantRegistration_service_1 = require("../services/restaurantRegistration.service");
exports.restaurantBaseModule = new inversify_1.ContainerModule((bind) => {
    // Vincula el repositorio
    bind(restaurantBase_types_1.RESTAURANT_BASE_TYPES.IRestaurantRepository).to(restaurantBase_repository_1.RestaurantBaseRepository);
    // Vincula el servicio base
    bind(restaurantBase_types_1.RESTAURANT_BASE_TYPES.IRestaurantService).to(restaurantBase_service_1.RestaurantBaseService);
    // Vincula el servicio de registro
    bind(restaurantBase_types_1.RESTAURANT_BASE_TYPES.IRestaurantRegisterService).to(restaurantRegistration_service_1.RestaurantRegistrationService);
});
