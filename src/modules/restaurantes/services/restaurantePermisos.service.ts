import { inject, injectable } from "inversify";
import { IRestaurantPermissionsService } from "../interfaces/IRestaurantPermissionsService";
import { IRestaurantPermissionsRepository } from "../interfaces/IRestaurantPermissionsRepository";
import { RESTAURANT_PERMISSIONS_TYPES } from "../types/restaurantPermissions.types";

<<<<<<< Updated upstream
const rolesRepo = new RestaurantRolesRepository();

//* 🔍 Servicio para verificar si un usuario es manager o co-manager de un restaurante
export const checkUserRoleInRestaurantService = async (restaurantId: string, userId: string): Promise<boolean> => {
  return await rolesRepo.checkUserRoleInRestaurant(restaurantId, userId);
};
=======
@injectable()
export class RestaurantPermissionsService implements IRestaurantPermissionsService {
  constructor(
    @inject(RESTAURANT_PERMISSIONS_TYPES.IRestaurantPermissionsRepository) 
    private rolesRepo: IRestaurantPermissionsRepository
  ) {}

  async checkUserRoleInRestaurant(restaurantId: string, userId: string): Promise<boolean> {
    return await this.rolesRepo.checkUserRoleInRestaurant(restaurantId, userId);
  }
}
>>>>>>> Stashed changes
