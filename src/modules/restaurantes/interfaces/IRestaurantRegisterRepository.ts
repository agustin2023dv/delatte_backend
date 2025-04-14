// src/modules/restaurantes/interfaces/IRestaurantRegisterRepository.ts

import { IRestaurant } from "@delatte/shared/interfaces";
import { IRestaurantRegistrationDTO } from "@delatte/shared/dtos";

export interface IRestaurantRegisterRepository {
  create(data: IRestaurantRegistrationDTO): Promise<IRestaurant>;
}
