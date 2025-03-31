import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.model";
import { IRestaurant } from "@delatte/shared/interfaces";
import { IRestaurantRegistrationDTO } from "@delatte/shared/dtos";
import { IRestaurantRegisterRepository } from "../interfaces/IRestaurantRegisterRepository";
import { RestaurantBaseTransformer } from "src/transformers/restaurant.base.transformer";

@injectable()
export class RestaurantRegisterRepository implements IRestaurantRegisterRepository {
  async create(
    data: IRestaurantRegistrationDTO & {
      ubicacion: { type: "Point"; coordinates: [number, number] };
    }
  ): Promise<IRestaurant> {
    const restaurantObject = RestaurantBaseTransformer.fromDTO(data, data.ubicacion);
    const newRestaurant = new Restaurant(restaurantObject);
    return await newRestaurant.save();
  }
}
