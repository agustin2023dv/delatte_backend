import { IRestaurant } from "@delatte/shared/interfaces";

export interface IRestaurantRegisterService {
    registerRestaurant(
        restaurantData: Partial<IRestaurant>
    ): Promise<IRestaurant>;

    registerRestaurantAndManager(
        restaurantData: Partial<IRestaurant>, 
        managerData: { nombre: string; apellido: string; email: string; password: string }
    ): Promise<{ savedRestaurant: IRestaurant; savedManager: any }>;
}
