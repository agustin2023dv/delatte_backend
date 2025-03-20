import { IRestaurant } from "@delatte/shared/interfaces/Restaurant/IRestaurant";


export interface IRestaurantRepository {
    getAll(): Promise<IRestaurant[]>;
    findById(id: string): Promise<IRestaurant>;
    findByManagerId(managerId: string): Promise<IRestaurant[]>;
    create(restaurantData: Partial<IRestaurant>): Promise<IRestaurant>;
    update(id: string, newRestaurantData: Partial<IRestaurant>): Promise<IRestaurant>;
}
