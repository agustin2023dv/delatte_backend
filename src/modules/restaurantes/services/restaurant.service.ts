import { RestaurantRepository } from "../repositories/restaurant.repository";
import { IRestaurant } from "@delatte/shared/interfaces";
import { getCoordinatesFromAddress } from "../../integrations/services/geolocation.service";
import { UserRegisterService } from "../../usuarios/services/userRegister.service";
import { UserAuthService } from "../../usuarios/services/userAuth.service";
import { Types } from "mongoose";

export class RestaurantService {
  private static restaurantRepo = new RestaurantRepository();

  //* Obtener todos los restaurantes
  static async getAllRestaurants() {
    return await this.restaurantRepo.getAll();
  }

  //* Obtener los detalles de un restaurante por ID
  static async getRestaurantById(restaurantId: string) {
    return await this.restaurantRepo.findById(restaurantId);
  }

  //* Obtener restaurantes de un manager
  static async getRestaurantsByManagerId(managerId: string) {
    return await this.restaurantRepo.findByManagerId(managerId);
  }

  //* Actualizar un restaurante
  static async updateRestaurant(id: string, newRestaurantData: Partial<IRestaurant>) {
    return await this.restaurantRepo.update(id, newRestaurantData);
  }

  //* Registrar un nuevo restaurante
  static async registerRestaurant(restaurantData: Partial<IRestaurant>) {
    try {
      // Obtener coordenadas de la dirección
      const direccionCompleta = `${restaurantData.direccion}, Montevideo, ${restaurantData.codigoPostal || ""}, Uruguay`;
      const coordenadas = await getCoordinatesFromAddress(direccionCompleta);

      if (!coordenadas) throw new Error("No se encontraron coordenadas para la dirección proporcionada.");

      // Crear restaurante con coordenadas en GeoJSON
      restaurantData.ubicacion = {
        type: "Point",
        coordinates: [coordenadas.longitude, coordenadas.latitude],
      };

      return await this.restaurantRepo.create(restaurantData);
    } catch (error) {
      console.error("Error al registrar restaurante:", error);
      throw error;
    }
  }

  //* Registrar restaurante y manager
  static async registerRestaurantAndManager(restaurantData: Partial<IRestaurant>, managerData: any) {
    try {
      console.log("Restaurant details: ", restaurantData);
      console.log("Manager: ", managerData);

      // Hashear la contraseña del manager
      const hashedPassword = await UserAuthService.hashPassword(managerData.password);
      managerData.password = hashedPassword;

      // Guardar el manager
      const savedManager = await UserRegisterService.registerManager(managerData);

      // Asociar el manager principal al restaurante
      restaurantData.managerPrincipal = 
      new Types.ObjectId(savedManager._id.toString());
      
      // Guardar el restaurante
      const savedRestaurant = await this.registerRestaurant(restaurantData);

      return { savedRestaurant, savedManager };
    } catch (error) {
      console.error("Error al registrar el restaurante y manager:", error);
      throw error;
    }
  }
}
