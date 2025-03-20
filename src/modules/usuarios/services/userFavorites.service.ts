import { inject, injectable } from "inversify";
import { USER_FAVORITES_TYPES } from "../types/userFavorites.types";
import { UserFavoritesRepository } from "../repositories/userFavorites.repository";

<<<<<<< Updated upstream
// 📌 Obtener restaurantes favoritos de un usuario
export const getUserFavoritesService = async (userId: string) => {
  return await UserFavoritesRepository.getUserFavorites(userId);
};

// 📌 Agregar un restaurante a favoritos
export const addFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
  try {
    const favorites = await UserFavoritesRepository.addFavoriteRestaurant(userId, restaurantId);
    return { message: "Restaurante agregado a favoritos", favorites };
  } catch (error) {
    console.error("Error en addFavoriteRestaurantService:", error);
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
=======
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
>>>>>>> Stashed changes
  }
};

<<<<<<< Updated upstream
// 📌 Eliminar un restaurante de favoritos
export const removeFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
  try {
    const favorites = await UserFavoritesRepository.removeFavoriteRestaurant(userId, restaurantId);
    return { message: "Restaurante eliminado de favoritos", favorites };
  } catch (error) {
    console.error("Error en removeFavoriteRestaurantService:", error);
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
=======
  async removeFavoriteRestaurant(userId: string, restaurantId: string) {
    try {
      const favorites = await this.userFavoritesRepository.removeFavoriteRestaurant(userId, restaurantId);
      return { message: "Restaurante eliminado de favoritos", favorites };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Error desconocido");
    }
>>>>>>> Stashed changes
  }
};
