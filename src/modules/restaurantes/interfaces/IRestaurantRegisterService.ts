import { IRestaurant } from "@delatte/shared/interfaces";
import { IRestaurantRegistrationDTO, IManagerRegistrationDTO } from "@delatte/shared/dtos";

export interface IRestaurantRegisterService {
  registerRestaurant(
    restaurantData: IRestaurantRegistrationDTO
  ): Promise<IRestaurant>;

  registerRestaurantAndManager(
    restaurantData: IRestaurantRegistrationDTO,
    managerData: IManagerRegistrationDTO
  ): Promise<{ savedRestaurant: IRestaurant; savedManager: any }>;
}
