import { ContainerModule } from "inversify";
import { IRestaurantPermissionsService } from "../interfaces/IRestaurantPermissionsService";
import { RestaurantPermissionsService } from "../services/restaurantPermissions.service";
import { IRestaurantPermissionsRepository } from "../interfaces/IRestaurantPermissionsRepository";
import { RestaurantPermissionsRepository } from "../repositories/restaurantPermissions.repository";
import { RESTAURANT_PERMISSIONS_TYPES } from "../types/restaurantPermissions.types";

export const restaurantPermissionsModule = new ContainerModule((bind) => {
    bind<IRestaurantPermissionsRepository>(RESTAURANT_PERMISSIONS_TYPES.IRestaurantPermissionsRepository).to(RestaurantPermissionsRepository);
    bind<IRestaurantPermissionsService>(RESTAURANT_PERMISSIONS_TYPES.IRestaurantPermissionsService).to(RestaurantPermissionsService);

});
