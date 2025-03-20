import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.model";
import { IRestaurantPermissionsRepository } from "../interfaces/IRestaurantPermissionsRepository";

@injectable()
export class RestaurantPermissionsRepository implements IRestaurantPermissionsRepository {
  async checkUserRoleInRestaurant(restaurantId: string, userId: string): Promise<boolean> {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) throw new Error("Restaurante no encontrado");

    return (
      restaurant.management.managerPrincipal?.toString() === userId ||
      restaurant.management.coManagers.some((manager) => manager.toString() === userId)
    );
  }
}
