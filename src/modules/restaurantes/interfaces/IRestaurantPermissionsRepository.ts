export interface IRestaurantPermissionsRepository {
    checkUserRoleInRestaurant(restaurantId: string, userId: string): Promise<boolean>;
  }