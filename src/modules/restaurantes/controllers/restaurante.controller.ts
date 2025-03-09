import {Response } from 'express';
import {
  getAllRestaurantsService,
  getRestaurantDetailsService,
  getRestaurantsByManagerIdService,
  registerRestaurantService,
  updateRestaurantService
} from '../services/restaurant.service';
import { AuthRequest } from '../../../../types';
import { hashPasswordService } from '../../usuarios/services/userAuth.service';
import { registerManagerService } from '../../usuarios/services/userRegister.service';

//* Controlador para crear un nuevo restaurante y manager
export const registerRestaurantAndManagerController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    console.log("Datos recibidos en el controlador:", req.body);

    const { restaurant: restaurantData, manager: managerData } = req.body;

    // Hashear la contraseña del usuario
    const hashedPassword = await hashPasswordService(managerData.password);
    managerData.password = hashedPassword;

    console.log("Restaurant details: ", restaurantData);
    console.log("Manager: ", managerData);

    // Guardar el manager
    const savedManager = await registerManagerService(managerData);

    // Asociar el manager principal al restaurante
    restaurantData.managerPrincipal = savedManager._id;

    // Guardar el restaurante
    const savedRestaurant = await registerRestaurantService(restaurantData);

    res.status(201).json({ savedRestaurant, savedManager });
  } catch (error) {
    console.error("Error en el controlador:", error);
    res.status(500).json({
      message: "Error al registrar el restaurante y manager",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

//* Controlador para obtener TODOS los restaurantes
export const getAllRestaurantsController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurants = await getAllRestaurantsService();

    if (!restaurants || restaurants.length === 0) {
      res.status(404).json({ message: "No se encontraron restaurantes" });
      return;
    }

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener restaurantes", error });
  }
};

//* Controlador para obtener los detalles de un restaurante

export const getRestaurantByIdController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurant = await getRestaurantDetailsService(req.params.id);

    if (!restaurant) {
      res.status(404).json({ message: "Restaurante no encontrado" });
      return;
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el restaurante", error });
  }
};

//* Controlador para actualizar un restaurante
export const updateRestaurantController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updatedRestaurant = await updateRestaurantService(req.params.id, req.body);

    if (!updatedRestaurant) {
      res.status(404).json({ message: "Restaurante no encontrado" });
      return;
    }

    res.status(200).json(updatedRestaurant);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el restaurante", error });
  }
};

//*Controlador para obtener restaurantes a cargo de un manager
export const getRestaurantsByManagerIdController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const restaurants = await getRestaurantsByManagerIdService(req.params.id);

    if (!restaurants) {
      res.status(404).json({ message: "No se encontraron restaurantes para este manager" });
      return;
    }

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los restaurantes", error });
  }
};



