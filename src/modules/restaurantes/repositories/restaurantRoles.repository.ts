import { ObjectId } from "mongoose";
import Restaurant from "../models/Restaurant.model";

export class RestaurantRolesRepository {
  //* 🔍 Verificar si un usuario es manager o co-manager de un restaurante
  async checkUserRoleInRestaurant(restaurantId: string, userId: string): Promise<boolean> {
    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) throw new Error("Restaurante no encontrado");

    return (
      restaurant.managerPrincipal?.toString() === userId ||
      restaurant.coManagers.some((manager: ObjectId | string) => manager.toString() === userId)
    );
  }
}
