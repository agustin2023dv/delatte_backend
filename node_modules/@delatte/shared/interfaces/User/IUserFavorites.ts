import { Types } from "mongoose";

export interface IUserFavorites {
  favoriteRestaurants?: Types.ObjectId[];
}
