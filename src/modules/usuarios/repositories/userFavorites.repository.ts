import { injectable } from "inversify";
import { Types } from "mongoose";
import User from "../models/User.model";

@injectable()
export class UserFavoritesRepository {
  async getUserFavorites(userId: string) {
    const user = await User.findById(userId).select("favoriteRestaurants").lean();
    if (!user) throw new Error("Usuario no encontrado");
    return user.favoriteRestaurants;
  }

  async addFavoriteRestaurant(userId: string, restaurantId: string) {
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

  async removeFavoriteRestaurant(userId: string, restaurantId: string) {
    if (!Types.ObjectId.isValid(restaurantId)) {
      throw new Error("ID de restaurante no válido");
    }

    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.favoriteRestaurants) user.favoriteRestaurants = [];

    const restaurantObjectId = new Types.ObjectId(restaurantId);
    user.favoriteRestaurants = user.favoriteRestaurants.filter((id) => !id.equals(restaurantObjectId));

    await user.save();
    return user.favoriteRestaurants;
  }
}
