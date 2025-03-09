import { RestaurantRolesRepository } from "../repositories/restaurantRoles.repository";

const rolesRepo = new RestaurantRolesRepository();

//* 🔍 Servicio para verificar si un usuario es manager o co-manager de un restaurante
export const checkUserRoleInRestaurantService = async (restaurantId: string, userId: string): Promise<boolean> => {
  return await rolesRepo.checkUserRoleInRestaurant(restaurantId, userId);
};
