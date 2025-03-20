import { Types } from "mongoose";

export interface IRestaurantPromotions {
    promociones?: Types.ObjectId[]; // Referencia a promociones
  }
  