export interface IRestaurantPermissionsService {
    checkUserRoleInRestaurant(restaurantId: string, userId: string): Promise<boolean>;
  }
  