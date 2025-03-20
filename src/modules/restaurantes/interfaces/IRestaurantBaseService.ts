import { IRestaurant } from "@delatte/shared/interfaces/Restaurant/IRestaurant";


export interface IRestaurantBaseService {
    getAllRestaurants(): Promise<IRestaurant[]>;
    getRestaurantById(restaurantId: string): Promise<IRestaurant>;
    getRestaurantsByManagerId(managerId: string): Promise<IRestaurant[]>;
    updateRestaurant(id: string, newRestaurantData: Partial<IRestaurant>): Promise<IRestaurant>;
}
