import { inject, injectable } from "inversify";
import { RESTAURANT_GALLERY_TYPES } from "../types/restaurantGallery.types";
import { IRestaurantGalleryService } from "../interfaces/IRestaurantGalleryService";
import { IRestaurantGalleryRepository } from "../interfaces/IRestaurantGalleryRepository";

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
