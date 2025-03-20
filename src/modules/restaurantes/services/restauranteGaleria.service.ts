import { inject, injectable } from "inversify";
import { RESTAURANT_GALLERY_TYPES } from "../types/restaurantGallery.types";
import { IRestaurantGalleryService } from "../interfaces/IRestaurantGalleryService";
import { IRestaurantGalleryRepository } from "../interfaces/IRestaurantGalleryRepository";

<<<<<<< Updated upstream
const galleryRepo = new RestaurantGalleryRepository();

//* 📷 Servicio para obtener fotos de la galería
export const getGalleryPhotosService = async (restaurantId: string) => {
  return await galleryRepo.getGalleryPhotos(restaurantId);
};

//* 📷 Servicio para agregar una foto a la galería
export const addPhotoToGalleryService = async (restaurantId: string, photoUrl: string) => {
  return await galleryRepo.addPhotoToGallery(restaurantId, photoUrl);
};

//* 📷 Servicio para eliminar una foto de la galería
export const removePhotoFromGalleryService = async (restaurantId: string, photoUrl: string) => {
  return await galleryRepo.removePhotoFromGallery(restaurantId, photoUrl);
};
=======
@injectable()
export class RestaurantGalleryService implements IRestaurantGalleryService {
  constructor(
    @inject(RESTAURANT_GALLERY_TYPES.IRestaurantGalleryRepository)
    private restaurantGalleryRepo: IRestaurantGalleryRepository
  ) {}

  async getGalleryPhotos(restaurantId: string): Promise<string[]> {
    return await this.restaurantGalleryRepo.getGalleryPhotos(restaurantId);
  }

  async addPhotoToGallery(restaurantId: string, photoUrl: string): Promise<string[]> {
    return await this.restaurantGalleryRepo.addPhotoToGallery(restaurantId, photoUrl);
  }

  async removePhotoFromGallery(restaurantId: string, photoUrl: string): Promise<string[]> {
    return await this.restaurantGalleryRepo.removePhotoFromGallery(restaurantId, photoUrl);
  }
}
>>>>>>> Stashed changes
