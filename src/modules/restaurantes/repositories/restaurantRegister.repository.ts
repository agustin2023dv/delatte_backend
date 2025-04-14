// src/modules/restaurantes/repositories/RestaurantRegisterRepository.ts

import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.model";
import { IRestaurant } from "@delatte/shared/interfaces";
import { IRestaurantRegistrationDTO } from "@delatte/shared/dtos";
import { IRestaurantRegisterRepository } from "../interfaces/IRestaurantRegisterRepository";
import { RestaurantBaseTransformer } from "src/transformers/restaurant.base.transformer";

@injectable()
export class RestaurantRegisterRepository implements IRestaurantRegisterRepository {
  async create(data: IRestaurantRegistrationDTO): Promise<IRestaurant> {
    // Ya no es necesario extraer ubicación por separado
    const restaurantObject = RestaurantBaseTransformer.fromDTO(data);

    const newRestaurant = new Restaurant(restaurantObject);
    return await newRestaurant.save();
  }
}
