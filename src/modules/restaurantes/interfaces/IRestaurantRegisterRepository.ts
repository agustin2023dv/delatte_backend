import { IRestaurant } from "@delatte/shared/interfaces";
import { IRestaurantRegistrationDTO } from "@delatte/shared/dtos";

export interface IRestaurantRegisterRepository {
  create(
    data: IRestaurantRegistrationDTO & {
      ubicacion: { type: "Point"; coordinates: [number, number] };
    }
  ): Promise<IRestaurant>;
}
