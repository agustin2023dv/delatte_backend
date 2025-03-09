import mongoose, { Types } from "mongoose";
import User from "../models/User.model";

export class UserFavoritesRepository {
  // 📌 Obtener IDs de restaurantes favoritos (consulta optimizada)
  static async getUserFavorites(userId: string) {
    const user = await User.findById(userId).select("favoriteRestaurants").lean();
    if (!user) throw new Error("Usuario no encontrado");
    return user.favoriteRestaurants;
  }

  // 📌 Agregar un restaurante a favoritos
  static async addFavoriteRestaurant(userId: string, restaurantId: string) {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new Error("ID de restaurante no válido");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.favoriteRestaurants) user.favoriteRestaurants = [];

    const restaurantObjectId = new Types.ObjectId(restaurantId);

    if (!user.favoriteRestaurants.some((id) => id.equals(restaurantObjectId))) {
      user.favoriteRestaurants.push(restaurantObjectId);
      await user.save();
    }

    return user.favoriteRestaurants;
  }

  // 📌 Eliminar un restaurante de favoritos
  static async removeFavoriteRestaurant(userId: string, restaurantId: string) {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new Error("ID de restaurante no válido");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.favoriteRestaurants) user.favoriteRestaurants = [];

    const restaurantObjectId = new Types.ObjectId(restaurantId);

    user.favoriteRestaurants = user.favoriteRestaurants.filter(
      (id) => !id.equals(restaurantObjectId)
    );
    await user.save();

    return user.favoriteRestaurants;
  }
}
