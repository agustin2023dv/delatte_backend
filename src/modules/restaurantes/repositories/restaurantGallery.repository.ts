import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.model";
import { IRestaurantGalleryRepository } from "../interfaces/IRestaurantGalleryRepository";

@injectable()
export class RestaurantGalleryRepository implements IRestaurantGalleryRepository {
  
  async getGalleryPhotos(restaurantId: string): Promise<string[]> {
    const restaurant = await Restaurant.findById(restaurantId).select("media.galeriaFotos");
    if (!restaurant) throw new Error("Restaurante no encontrado");


    return restaurant.media?.galeriaFotos ?? [];
  }

  async addPhotoToGallery(restaurantId: string, photoUrl: string): Promise<string[]> {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { "media.galeriaFotos": photoUrl } }, 
      { new: true }
    );
    if (!restaurant) throw new Error("Restaurante no encontrado");

    return restaurant.media?.galeriaFotos ?? [];
  }

  async removePhotoFromGallery(restaurantId: string, photoUrl: string): Promise<string[]> {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $pull: { "media.galeriaFotos": photoUrl } }, 
      { new: true }
    );
    if (!restaurant) throw new Error("Restaurante no encontrado");

    return restaurant.media?.galeriaFotos ?? [];
  }
}
