import { Types } from "mongoose";

export interface IRestaurantManagement {
    managerPrincipal: Types.ObjectId; // Referencia al manager principal
    coManagers: Types.ObjectId[]; // Referencia a otros managers
  }
  