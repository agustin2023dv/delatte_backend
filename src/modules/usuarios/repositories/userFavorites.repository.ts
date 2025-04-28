import { injectable } from "inversify";
import { Types } from "mongoose";
import User from "../models/User.model";
import Restaurant from "@/modules/restaurantes/models/Restaurant.model";

@injectable()
export class UserFavoritesRepository {
  async getUserFavorites(userId: string) {
    const user = await User.findById(userId).select("favorites.favoriteRestaurants").lean();
    if (!user || !user.favorites) throw new Error("Usuario no encontrado");

    return user.favorites.favoriteRestaurants ?? [];
  }

  async addFavoriteRestaurant(userId: string, restaurantId: string) {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new Error("ID de restaurante no válido");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.favorites) {
      user.favorites = { favoriteRestaurants: [] };
    }

    if (!user.favorites.favoriteRestaurants) {
      user.favorites.favoriteRestaurants = [];
    }

    const restaurantObjectId = new Types.ObjectId(restaurantId);

    if (!user.favorites.favoriteRestaurants.some((id) => id.equals(restaurantObjectId))) {
      user.favorites.favoriteRestaurants.push(restaurantObjectId);
      await user.save();
    }

    return user.favorites.favoriteRestaurants;
  }

  async removeFavoriteRestaurant(userId: string, restaurantId: string) {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new Error("ID de restaurante no válido");
    }

    const user = await User.findById(userId);
    if (!user || !user.favorites) throw new Error("Usuario no encontrado");

    if (!user.favorites.favoriteRestaurants) {
      user.favorites.favoriteRestaurants = [];
    }

    const restaurantObjectId = new Types.ObjectId(restaurantId);
    user.favorites.favoriteRestaurants = user.favorites.favoriteRestaurants.filter(
      (id) => !id.equals(restaurantObjectId)
    );

    await user.save();
    return user.favorites.favoriteRestaurants;
  }

  /**
   * 🛎️ Obtiene los restaurantes a partir de una lista de IDs
   */
  async getRestaurantsByIds(restaurantIds: string[]) {
    return await Restaurant.find({ _id: { $in: restaurantIds } }).lean();
  }
}
