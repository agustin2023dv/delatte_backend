import { RestaurantGalleryRepository } from "../repositories/restaurantGallery.repository";

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
