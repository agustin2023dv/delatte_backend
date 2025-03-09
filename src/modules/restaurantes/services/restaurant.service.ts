import { RestaurantRepository } from "../repositories/restaurant.repository";
import { IRestaurant } from "@delatte/shared/interfaces";
import { getCoordinatesFromAddress } from "../../integrations/services/geolocation.service";

const restaurantRepo = new RestaurantRepository();

//* Servicio para obtener todos los restaurantes
export const getAllRestaurantsService = async () => {
  return await restaurantRepo.getAll();
};

//* Servicio para obtener los detalles de un restaurante por ID
export const getRestaurantDetailsService = async (restaurantId: string) => {
  return await restaurantRepo.findById(restaurantId);
};

//* Servicio para obtener restaurantes de un manager
export const getRestaurantsByManagerIdService = async (managerId: string) => {
  return await restaurantRepo.findByManagerId(managerId);
};

//* Servicio para actualizar un restaurante
export const updateRestaurantService = async (id: string, newRestaurantData: Partial<IRestaurant>) => {
  return await restaurantRepo.update(id, newRestaurantData);
};

//* Servicio para registrar un nuevo restaurante
export const registerRestaurantService = async (restaurantData: Partial<IRestaurant>) => {
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

    return await restaurantRepo.create(restaurantData);
  } catch (error) {
    console.error("Error al registrar restaurante:", error);
    throw error;
  }
};
