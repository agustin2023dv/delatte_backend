import { RestaurantGalleryRepository } from "../repositories/restaurantGallery.repository";

export class RestaurantGalleryService {
  private static galleryRepo = new RestaurantGalleryRepository();

  //* 📷 Obtener fotos de la galería
  static async getGalleryPhotos(restaurantId: string) {
    return await this.galleryRepo.getGalleryPhotos(restaurantId);
  }

  //* 📷 Agregar una foto a la galería
  static async addPhotoToGallery(restaurantId: string, photoUrl: string) {
    return await this.galleryRepo.addPhotoToGallery(restaurantId, photoUrl);
  }

  //* 📷 Eliminar una foto de la galería
  static async removePhotoFromGallery(restaurantId: string, photoUrl: string) {
    return await this.galleryRepo.removePhotoFromGallery(restaurantId, photoUrl);
  }
}
