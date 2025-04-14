// src/modules/restaurantes/interfaces/IRestaurantRegisterService.ts

import { IRestaurant } from "@delatte/shared/interfaces";
import {
  IRestaurantRegistrationDTO,
  IRestaurantRegistrationInitialDTO,
  IManagerRegistrationDTO,
} from "@delatte/shared/dtos";

export interface IRestaurantRegisterService {
  registerRestaurant(
    restaurantData: IRestaurantRegistrationDTO
  ): Promise<IRestaurant>;

  registerRestaurantAndManager(
    restaurantData: IRestaurantRegistrationInitialDTO,
    managerData: IManagerRegistrationDTO
  ): Promise<{ savedRestaurant: IRestaurant; savedManager: any }>;
}
