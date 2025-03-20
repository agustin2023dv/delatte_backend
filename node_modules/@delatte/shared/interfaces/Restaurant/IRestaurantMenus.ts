import { Types } from "mongoose";

export interface IRestaurantMenus {
    menus: Types.ObjectId[]; // Referencia a menús
  }
  