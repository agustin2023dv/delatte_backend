import { ContainerModule } from "inversify";
import { RESTAURANT_GALLERY_TYPES } from "../types/restaurantGallery.types";
import { IRestaurantGalleryRepository } from "../interfaces/IRestaurantGalleryRepository";
import { IRestaurantGalleryService } from "../interfaces/IRestaurantGalleryService";
import { RestaurantGalleryRepository } from "../repositories/restaurantGallery.repository";
import { RestaurantGalleryService } from "../services/restauranteGaleria.service";

export const restaurantGalleryModule = new ContainerModule((bind) => {
  bind<IRestaurantGalleryRepository>(RESTAURANT_GALLERY_TYPES.IRestaurantGalleryRepository).to(RestaurantGalleryRepository);
  bind<IRestaurantGalleryService>(RESTAURANT_GALLERY_TYPES.IRestaurantGalleryService).to(RestaurantGalleryService);
});
