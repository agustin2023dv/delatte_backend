"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantGalleryModule = void 0;
const inversify_1 = require("inversify");
const restaurantGallery_types_1 = require("../types/restaurantGallery.types");
const restaurantGallery_repository_1 = require("../repositories/restaurantGallery.repository");
const restauranteGaleria_service_1 = require("../services/restauranteGaleria.service");
exports.restaurantGalleryModule = new inversify_1.ContainerModule((bind) => {
    bind(restaurantGallery_types_1.RESTAURANT_GALLERY_TYPES.IRestaurantGalleryRepository).to(restaurantGallery_repository_1.RestaurantGalleryRepository);
    bind(restaurantGallery_types_1.RESTAURANT_GALLERY_TYPES.IRestaurantGalleryService).to(restauranteGaleria_service_1.RestaurantGalleryService);
});
