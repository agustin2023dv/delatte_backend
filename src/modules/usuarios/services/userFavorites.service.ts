import { UserFavoritesRepository } from "../repositories/userFavorites.repository";

export class UserFavoritesService {
  
  // 📌 Obtener restaurantes favoritos de un usuario
  static async getUserFavorites(userId: string) {
    return await UserFavoritesRepository.getUserFavorites(userId);
  }

  // 📌 Agregar un restaurante a favoritos
  static async addFavoriteRestaurant(userId: string, restaurantId: string) {
    try {
      const favorites = await UserFavoritesRepository.addFavoriteRestaurant(userId, restaurantId);
      return { message: "Restaurante agregado a favoritos", favorites };
    } catch (error) {
      console.error("Error en addFavoriteRestaurantService:", error);
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
  }

  // 📌 Eliminar un restaurante de favoritos
  static async removeFavoriteRestaurant(userId: string, restaurantId: string) {
    try {
      const favorites = await UserFavoritesRepository.removeFavoriteRestaurant(userId, restaurantId);
      return { message: "Restaurante eliminado de favoritos", favorites };
    } catch (error) {
      console.error("Error en removeFavoriteRestaurantService:", error);
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
  }
}
