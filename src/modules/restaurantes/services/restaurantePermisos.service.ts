import { RestaurantRolesRepository } from "../repositories/restaurantRoles.repository";

export class RestaurantPermissionsService {
  private static rolesRepo = new RestaurantRolesRepository();

  //* 🔍 Verificar si un usuario es manager o co-manager de un restaurante
  static async checkUserRoleInRestaurant(restaurantId: string, userId: string): Promise<boolean> {
    return await this.rolesRepo.checkUserRoleInRestaurant(restaurantId, userId);
  }
}
