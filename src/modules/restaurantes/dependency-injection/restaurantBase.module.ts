import { ContainerModule } from "inversify";
import { RESTAURANT_BASE_TYPES } from "../types/restaurantBase.types";
import { IRestaurantRepository } from "../interfaces/IRestaurantRepository";
import { RestaurantBaseRepository } from "../repositories/restaurantBase.repository";
import { RestaurantBaseService } from "../services/restaurantBase.service";
import { IRestaurantBaseService } from "../interfaces/IRestaurantBaseService";
import { IRestaurantRegisterService } from "../interfaces/IRestaurantRegisterService";
import { RestaurantRegistrationService } from "../services/restaurantRegistration.service";


export const restaurantBaseModule = new ContainerModule((bind) => {
    // Vincula el repositorio
    bind<IRestaurantRepository>(RESTAURANT_BASE_TYPES.IRestaurantRepository).to(RestaurantBaseRepository);

    // Vincula el servicio base
    bind<IRestaurantBaseService>(RESTAURANT_BASE_TYPES.IRestaurantService).to(RestaurantBaseService);

    // Vincula el servicio de registro
    bind<IRestaurantRegisterService>(RESTAURANT_BASE_TYPES.IRestaurantRegisterService).to(RestaurantRegistrationService);

});