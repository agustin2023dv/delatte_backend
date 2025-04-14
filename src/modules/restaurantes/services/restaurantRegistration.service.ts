// src/modules/restaurantes/services/restaurantRegistration.service.ts

import { inject, injectable } from "inversify";
import { RESTAURANT_BASE_TYPES } from "../types/restaurantBase.types";
import { USER_ACCESS_TYPES } from "../../usuarios/types/userAccess.types";
import { IUserRegisterService } from "../../usuarios/interfaces/IUserRegisterService";
import { IPasswordHasher } from "../../usuarios/interfaces/IPasswordHasher";
import { IRestaurantRegisterService } from "../interfaces/IRestaurantRegisterService";
import { IRestaurant } from "@delatte/shared/interfaces";
import { getCoordinatesFromAddress } from "../../integrations/services/geolocation.service";
import {
  IRestaurantRegistrationDTO,
  IRestaurantRegistrationInitialDTO,
  IManagerRegistrationDTO,
} from "@delatte/shared/dtos";
import { IRestaurantRegisterRepository } from "../interfaces/IRestaurantRegisterRepository";
import { DiasSemana } from "@delatte/shared/interfaces";

/**
 * 🧾 Servicio encargado de registrar un restaurante y su manager asociado.
 */
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

  /**
   * 🧭 Registra un restaurante completo a partir de un DTO estandarizado.
   * Si no se encuentran coordenadas válidas, se usa fallback [0, 0].
   */
  async registerRestaurant(restaurantData: IRestaurantRegistrationDTO): Promise<IRestaurant> {
    try {
      const direccionCompleta = `${restaurantData.location.direccion}, ${restaurantData.location.localidad}, ${restaurantData.location.codigoPostal || ""}, ${restaurantData.location.pais}`;

      let ubicacion = {
        type: "Point" as const,
        coordinates: [0, 0] as [number, number],
      };

      try {
        const coordenadas = await getCoordinatesFromAddress(direccionCompleta);
        if (coordenadas) {
          ubicacion.coordinates = [coordenadas.longitude, coordenadas.latitude];
        } else {
          console.warn("📭 Coordenadas no encontradas. Se usará ubicación por defecto [0, 0].");
        }
      } catch (geoError) {
        console.error("🌐 Error al obtener coordenadas:", geoError);
        console.warn("➡️ Se continuará con coordenadas vacías como fallback.");
      }

      restaurantData.location.ubicacion = ubicacion;

      return await this.restaurantRepo.create(restaurantData);
    } catch (error) {
      console.error("❌ Error al registrar restaurante:", error);
      throw error;
    }
  }

  /**
   * 🧩 Registro conjunto de restaurante y manager
   */
  async registerRestaurantAndManager(
    restaurantInitialData: IRestaurantRegistrationInitialDTO,
    managerData: IManagerRegistrationDTO
  ): Promise<{ savedRestaurant: IRestaurant; savedManager: any }> {
    try {
      // 🔐 Hashear contraseña
      managerData.password = await this.passwordHasher.hash(managerData.password);

      // ✅ Registrar primero al manager
      const savedManager = await this.userRegisterService.registerManager(managerData);

      // 🏗️ Preparar datos del restaurante con managerPrincipal incluido
      const restaurantData: IRestaurantRegistrationDTO = {
        identity: {
          nombre: restaurantInitialData.nombre,
          descripcion: "",
        },
        contact: {
          telefono: managerData.telefono,
          emailContacto: managerData.email,
        },
        location: {
          pais: "Uruguay",
          localidad: "Montevideo",
          direccion: restaurantInitialData.direccion,
          codigoPostal: restaurantInitialData.codigoPostal,
          ubicacion: {
            type: "Point",
            coordinates: [0, 0],
          },
        },
        capacity: {
          capacidadMesas: [{ cantidad: 5, personasPorMesa: 4 }],
        },
        tradingHours: {
          horarios: [
            {
              dia: DiasSemana.Lunes,
              horaApertura: "09:00",
              horaCierre: "18:00",
            },
          ],
        },
        media: {
          logo: "",
          galeriaFotos: [],
        },
        tags: [],
        management: {
          managerPrincipal: savedManager._id.toString(),
          coManagers: [],
        },
      };

      // 🧾 Registrar restaurante con manager incluido
      const savedRestaurant = await this.registerRestaurant(restaurantData);

      return { savedRestaurant, savedManager };
    } catch (error) {
      console.error("❌ Error al registrar restaurante y manager:", error);
      throw error;
    }
  }
}
