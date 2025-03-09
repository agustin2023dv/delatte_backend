import Restaurant from "../models/Restaurant.model";


// Obtener las fotos de la galería de un restaurante
export const getGalleryPhotosService = async (restaurantId: string) => {
    try {
      const restaurant = await Restaurant.findById(restaurantId).select("galeriaFotos");
      if (!restaurant) {
        throw new Error("Restaurante no encontrado");
      }
      return restaurant.galeriaFotos;
    } catch (error) {
      throw new Error("Error al obtener las fotos de la galería");
    }
  };
  
  // Agregar una foto a la galería de un restaurante
  export const addPhotoToGalleryService = async (restaurantId: string, photoUrl: string) => {
    try {
      const restaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        { $push: { galeriaFotos: photoUrl } },
        { new: true }
      );
  
      if (!restaurant) {
        throw new Error("Restaurante no encontrado");
      }
  
      return restaurant.galeriaFotos;
    } catch (error) {
      throw new Error("Error al agregar la foto a la galería");
    }
  };
  
  // Eliminar una foto de la galería de un restaurante
  export const removePhotoFromGalleryService = async (restaurantId: string, photoUrl: string) => {
    try {
      const restaurant = await Restaurant.findByIdAndUpdate(
        restaurantId,
        { $pull: { galeriaFotos: photoUrl } },
        { new: true }
      );
      if (!restaurant) {
        throw new Error("Restaurante no encontrado");
      }
      return restaurant.galeriaFotos;
    } catch (error) {
      throw new Error("Error al eliminar la foto de la galería");
    }
  };