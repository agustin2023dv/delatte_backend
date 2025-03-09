import Restaurant from "../models/Restaurant.model";

export class RestaurantGalleryRepository {
  //* 📷 Obtener las fotos de la galería de un restaurante
  async getGalleryPhotos(restaurantId: string) {
    const restaurant = await Restaurant.findById(restaurantId).select("galeriaFotos");
    if (!restaurant) throw new Error("Restaurante no encontrado");
    return restaurant.galeriaFotos;
  }

  //* 📷 Agregar una foto a la galería
  async addPhotoToGallery(restaurantId: string, photoUrl: string) {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $push: { galeriaFotos: photoUrl } },
      { new: true }
    );
    if (!restaurant) throw new Error("Restaurante no encontrado");
    return restaurant.galeriaFotos;
  }

  //* 📷 Eliminar una foto de la galería
  async removePhotoFromGallery(restaurantId: string, photoUrl: string) {
    const restaurant = await Restaurant.findByIdAndUpdate(
      restaurantId,
      { $pull: { galeriaFotos: photoUrl } },
      { new: true }
    );
    if (!restaurant) throw new Error("Restaurante no encontrado");
    return restaurant.galeriaFotos;
  }
}
