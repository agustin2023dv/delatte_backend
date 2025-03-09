import { IRestaurant } from "@delatte/shared/interfaces";
import { getCoordinatesFromAddress } from "../../integrations/services/geolocation.service";
import Restaurant from "../models/Restaurant.model";


//* Servicio para obtener el restaurante del manager
export const getRestauranteIdByManagerService = async (managerId: string) => {
  try {
    const restaurante = await Restaurant.findOne({ managers: managerId });
    return restaurante?._id;
  } catch (error) {
    throw new Error('Error al obtener el restaurante del manager');
  }
};

//* Servicio para obtener TODOS los restaurantes
export const getAllRestaurantsService = async () => {
  try {
    const restaurantes = await Restaurant.find().lean(); 
    return restaurantes;
  } catch (error) {
    console.error("Error al obtener restaurantes:", error);
    throw new Error("Error al obtener restaurantes");
  }
};
//** Servicio para actualizar un restaurante por ID
export const updateRestaurantService = async (id: string, newRestaurantData: Partial<IRestaurant>) => {
  try {
    return await Restaurant.findByIdAndUpdate(id, newRestaurantData, { new: true });
  } catch (error) {
    throw new Error('Error al actualizar el restaurante');
  }
};

//** Servicio para crear restaurante
export const registerRestaurantService = async (restaurantData: Partial<IRestaurant>) => {
  try {
    const direccionCompleta = `${restaurantData.direccion}, Montevideo, ${restaurantData.codigoPostal || ''}, Uruguay`;
    console.log("Dirección completa:", direccionCompleta);

    let latitude: number | undefined;
    let longitude: number | undefined;

    // Obtener coordenadas a partir de la dirección
    try {
      const coordenadas = await getCoordinatesFromAddress(direccionCompleta);
      console.log("Coordenadas obtenidas:", coordenadas);
      if (coordenadas) {
        latitude = coordenadas.latitude;
        longitude = coordenadas.longitude;
      } else {
        throw new Error("No se encontraron coordenadas para la dirección proporcionada.");
      }
    } catch (error) {
      console.error('Error al obtener coordenadas:', error);
      throw new Error('Error al obtener coordenadas para el restaurante.');
    }

    // Crear el restaurante con el manager principal asignado y ubicacion en formato GeoJSON
    const newRestaurant = new Restaurant({
      ...restaurantData,
      ubicacion: {
        type: "Point",
        coordinates: [longitude!, latitude!], // [longitud, latitud] formato GeoJSON
      },
    });

    const savedRestaurant = await newRestaurant.save();
    console.log('Restaurante guardado:', savedRestaurant);
    return savedRestaurant;
  } catch (error) {
    console.error('Error al guardar el restaurante:', error);
    throw error;
  }
};


// ** Servicio para obtener todos los detalles de un restaurante por ID
export const getRestaurantDetailsService = async (restaurantId: string) => {
  try {
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      throw new Error('Restaurante no encontrado');
    }

    return restaurant;
  } catch (error) {
    throw new Error('Error al obtener los detalles del restaurante');
  }
};


//*
export const getRestaurantsByManagerIdService = async (id: string) => {
  try {
    const restaurants = await Restaurant.find({
         managerPrincipal: id
    });
    return restaurants;
  } catch (error) {
    throw new Error('Error al obtener los restaurantes del manager');
  }
};


