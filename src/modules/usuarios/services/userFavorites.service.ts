import { UserFavoritesRepository } from "../repositories/userFavorites.repository";

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
  }
};

// 📌 Eliminar un restaurante de favoritos
export const removeFavoriteRestaurantService = async (userId: string, restaurantId: string) => {
  try {
    const favorites = await UserFavoritesRepository.removeFavoriteRestaurant(userId, restaurantId);
    return { message: "Restaurante eliminado de favoritos", favorites };
  } catch (error) {
    console.error("Error en removeFavoriteRestaurantService:", error);
    throw new Error(error instanceof Error ? error.message : "Error desconocido");
  }
};
