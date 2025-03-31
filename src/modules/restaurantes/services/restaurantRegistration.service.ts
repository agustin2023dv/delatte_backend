import { inject, injectable } from "inversify";
import { RESTAURANT_BASE_TYPES } from "../types/restaurantBase.types";
import { USER_ACCESS_TYPES } from "../../usuarios/types/userAccess.types";
import { IUserRegisterService } from "../../usuarios/interfaces/IUserRegisterService";
import { IPasswordHasher } from "../../usuarios/interfaces/IPasswordHasher";
import { IRestaurantRegisterService } from "../interfaces/IRestaurantRegisterService";
import { IRestaurant } from "@delatte/shared/interfaces";
import { Types } from "mongoose";
import { getCoordinatesFromAddress } from "../../integrations/services/geolocation.service";
import { IRestaurantRegistrationDTO, IManagerRegistrationDTO } from "@delatte/shared/dtos";
import { IRestaurantRegisterRepository } from "../interfaces/IRestaurantRegisterRepository";

@injectable()
export class RestaurantRegistrationService implements IRestaurantRegisterService {
  constructor(
    @inject(RESTAURANT_BASE_TYPES.IRestaurantRegisterRepository)
    private restaurantRepo: IRestaurantRegisterRepository,

    @inject(USER_ACCESS_TYPES.IUserRegisterService)
    private userRegisterService: IUserRegisterService,

    @inject(USER_ACCESS_TYPES.PasswordHasher)
    private passwordHasher: IPasswordHasher
  ) {}

  async registerRestaurant(restaurantData: IRestaurantRegistrationDTO): Promise<IRestaurant> {
    try {
      const direccionCompleta = `${restaurantData.direccion}, Montevideo, ${restaurantData.codigoPostal || ""}, Uruguay`;
      const coordenadas = await getCoordinatesFromAddress(direccionCompleta);

      if (!coordenadas) throw new Error("No se encontraron coordenadas para la dirección proporcionada.");

      return await this.restaurantRepo.create({
        ...restaurantData,
        ubicacion: {
          type: "Point",
          coordinates: [coordenadas.longitude, coordenadas.latitude],
        },
      });
    } catch (error) {
      console.error("Error al registrar restaurante:", error);
      throw error;
    }
  }

  async registerRestaurantAndManager(
    restaurantData: IRestaurantRegistrationDTO,
    managerData: IManagerRegistrationDTO
  ): Promise<{ savedRestaurant: IRestaurant; savedManager: any }> {
    try {
      managerData.password = await this.passwordHasher.hash(managerData.password);

      const [savedManager, savedRestaurant] = await Promise.all([
        this.userRegisterService.registerManager(managerData),
        this.registerRestaurant(restaurantData),
      ]);

      savedRestaurant.management.managerPrincipal = new Types.ObjectId(savedManager._id.toString());

      return { savedRestaurant, savedManager };
    } catch (error) {
      console.error("Error al registrar el restaurante y manager:", error);
      throw error;
    }
  }
}
