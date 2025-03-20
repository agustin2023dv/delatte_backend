export interface IRestaurantGalleryRepository {
    getGalleryPhotos(restaurantId: string): Promise<string[]>;
    addPhotoToGallery(restaurantId: string, photoUrl: string): Promise<string[]>;
    removePhotoFromGallery(restaurantId: string, photoUrl: string): Promise<string[]>;
  }
  