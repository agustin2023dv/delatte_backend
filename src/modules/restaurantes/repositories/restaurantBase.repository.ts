import { injectable } from "inversify";
import Restaurant from "../models/Restaurant.model";
import { IRestaurant } from "@delatte/shared/interfaces";
import { IRestaurantBaseRepository } from "../interfaces/IRestaurantBaseRepository";

@injectable()
export class RestaurantBaseRepository implements IRestaurantBaseRepository {
    async getAll(): Promise<IRestaurant[]> {
        return await Restaurant.find().lean();
    }

    async findById(id: string): Promise<IRestaurant> {
        const restaurant = await Restaurant.findById(id);
        if (!restaurant) throw new Error("Restaurante no encontrado");
        return restaurant;
    }

    async findByManagerId(managerId: string): Promise<IRestaurant[]> {
        return await Restaurant.find({ managerPrincipal: managerId });
    }

    async create(restaurantData: Partial<IRestaurant>): Promise<IRestaurant> {
        const newRestaurant = new Restaurant(restaurantData);
        return await newRestaurant.save();
    }

    async update(id: string, newRestaurantData: Partial<IRestaurant>): Promise<IRestaurant> {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, newRestaurantData, { new: true });
        if (!updatedRestaurant) throw new Error("No se pudo actualizar el restaurante, no existe");
        return updatedRestaurant;
    }
}
