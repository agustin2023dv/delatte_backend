import { Types } from "mongoose";


export interface IReviewRestaurant {
  restaurante: Types.ObjectId | { _id: Types.ObjectId | string; nombre: string; direccion: string };
}
