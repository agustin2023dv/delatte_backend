import { inject, injectable } from "inversify";
import { RESTAURANT_BASE_TYPES } from "../types/restaurantBase.types";
import { IRestaurant } from "@delatte/shared/interfaces";
import { getCoordinatesFromAddress } from "../../integrations/services/geolocation.service";
import { IRestaurantBaseService } from "../interfaces/IRestaurantBaseService";
import { IRestaurantBaseRepository } from "../interfaces/IRestaurantBaseRepository";

@injectable()
export class RestaurantBaseService implements IRestaurantBaseService {
    constructor(
        @inject(RESTAURANT_BASE_TYPES.IRestaurantRepository)
        private restaurantRepo: IRestaurantBaseRepository,
    ) {}

    async getAllRestaurants(): Promise<IRestaurant[]> {
        return await this.restaurantRepo.getAll();
    }

    async getRestaurantById(restaurantId: string): Promise<IRestaurant> {
        return await this.restaurantRepo.findById(restaurantId);
    }

    async getRestaurantsByManagerId(managerId: string): Promise<IRestaurant[]> {
        return await this.restaurantRepo.findByManagerId(managerId);
    }

    async updateRestaurant(id: string, newRestaurantData: Partial<IRestaurant>): Promise<IRestaurant> {
        return await this.restaurantRepo.update(id, newRestaurantData);
    }

    async registerRestaurant(restaurantData: Partial<IRestaurant>): Promise<IRestaurant> {
        try {
            // Verificar si location existe
            if (!restaurantData.location) {
                throw new Error("La ubicación del restaurante no fue proporcionada.");
            }
    
            const direccionCompleta = `${restaurantData.location.direccion}, Montevideo, ${restaurantData.location.codigoPostal || ""}, Uruguay`;
            const coordenadas = await getCoordinatesFromAddress(direccionCompleta);
    
            if (!coordenadas) throw new Error("No se encontraron coordenadas para la dirección proporcionada.");
    
            restaurantData.location.ubicacion = {
                type: "Point",
                coordinates: [coordenadas.longitude, coordenadas.latitude],
            };
    
            return await this.restaurantRepo.create(restaurantData);
        } catch (error) {
            console.error("Error al registrar restaurante:", error);
            throw error;
        }
    }


}
