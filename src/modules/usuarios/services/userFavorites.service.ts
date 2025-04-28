import { inject, injectable } from "inversify";
import { USER_FAVORITES_TYPES } from "../types/userFavorites.types";
import { UserFavoritesRepository } from "../repositories/userFavorites.repository";

@injectable()
export class UserFavoritesService {
  constructor(
    @inject(USER_FAVORITES_TYPES.UserFavoritesRepository)
    private userFavoritesRepository: UserFavoritesRepository
  ) {}

  async getUserFavorites(userId: string) {
    return await this.userFavoritesRepository.getUserFavorites(userId);
  }

  async addFavoriteRestaurant(userId: string, restaurantId: string) {
    try {
      const favorites = await this.userFavoritesRepository.addFavoriteRestaurant(userId, restaurantId);
      return { message: "Restaurante agregado a favoritos", favorites };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
  }

  async removeFavoriteRestaurant(userId: string, restaurantId: string) {
    try {
      const favorites = await this.userFavoritesRepository.removeFavoriteRestaurant(userId, restaurantId);
      return { message: "Restaurante eliminado de favoritos", favorites };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
  }

  /**
   * 🛎️ Obtiene los detalles de los restaurantes favoritos a partir de sus IDs
   */
  async getFavoriteRestaurantsDetails(restaurantIds: string[]) {
    try {
      return await this.userFavoritesRepository.getRestaurantsByIds(restaurantIds);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
  }
}
