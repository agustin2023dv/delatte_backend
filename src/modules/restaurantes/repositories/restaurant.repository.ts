import Restaurant from "../models/Restaurant.model";
import { IRestaurant } from "@delatte/shared/interfaces";

export class RestaurantRepository {
  //* Obtener todos los restaurantes
  async getAll() {
    return await Restaurant.find().lean();
  }

  //* Obtener un restaurante por ID
  async findById(id: string) {
    return await Restaurant.findById(id);
  }

  //* Buscar restaurantes por ID de manager
  async findByManagerId(managerId: string) {
    return await Restaurant.find({ managerPrincipal: managerId });
  }

  //* Crear un nuevo restaurante
  async create(restaurantData: Partial<IRestaurant>) {
    const newRestaurant = new Restaurant(restaurantData);
    return await newRestaurant.save();
  }

  //* Actualizar un restaurante por ID
  async update(id: string, newRestaurantData: Partial<IRestaurant>) {
    return await Restaurant.findByIdAndUpdate(id, newRestaurantData, { new: true });
  }
}
