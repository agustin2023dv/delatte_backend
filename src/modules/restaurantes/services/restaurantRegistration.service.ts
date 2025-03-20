import { inject, injectable } from "inversify";
import { RESTAURANT_BASE_TYPES } from "../types/restaurantBase.types";
import { USER_ACCESS_TYPES } from "../../usuarios/types/userAccess.types";
import { IUserRegisterService } from "../../usuarios/interfaces/IUserRegisterService";
import { IPasswordHasher } from "../../usuarios/interfaces/IPasswordHasher";
import { IRestaurantRegisterService } from "../interfaces/IRestaurantRegisterService";
import { IRestaurant } from "@delatte/shared/interfaces";
import { Types } from "mongoose";
import { getCoordinatesFromAddress } from "../../integrations/services/geolocation.service";

@injectable()
export class RestaurantRegistrationService implements IRestaurantRegisterService {
    constructor(

        @inject(RESTAURANT_BASE_TYPES.IRestaurantService)
        private restaurantRegisterService: IRestaurantRegisterService,

        @inject(USER_ACCESS_TYPES.IUserRegisterService)
        private userRegisterService: IUserRegisterService,

        @inject(USER_ACCESS_TYPES.PasswordHasher)
        private passwordHasher: IPasswordHasher
    ) {}
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
    
            return await this.restaurantRegisterService.registerRestaurant(restaurantData);
        } catch (error) {
            console.error("Error al registrar restaurante:", error);
            throw error;
        }
    }

    async registerRestaurantAndManager(restaurantData: Partial<IRestaurant>, managerData: any) {
        try {
            console.log("Restaurant details: ", restaurantData);
            console.log("Manager details: ", managerData);

            // 🔹 Hashear contraseña del manager
            managerData.password = await this.passwordHasher.hash(managerData.password);

            // 🔹 Ejecutar ambas funciones en paralelo para mejorar rendimiento
            const [savedManager, savedRestaurant] = await Promise.all([
                this.userRegisterService.registerManager(managerData),
                this.registerRestaurant(restaurantData),
            ]);

            // 🔹 Asociar el manager al restaurante
            savedRestaurant.management.managerPrincipal = new Types.ObjectId(savedManager._id.toString());

            return { savedRestaurant, savedManager };
        } catch (error) {
            console.error("Error al registrar el restaurante y manager:", error);
            throw error;
        }
    }
}
