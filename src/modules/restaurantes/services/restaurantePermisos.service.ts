import { inject, injectable } from "inversify";
import { IRestaurantPermissionsService } from "../interfaces/IRestaurantPermissionsService";
import { IRestaurantPermissionsRepository } from "../interfaces/IRestaurantPermissionsRepository";
import { RESTAURANT_PERMISSIONS_TYPES } from "../types/restaurantPermissions.types";

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
