import { Response } from "express";
import { RestaurantService } from "../services/restaurant.service";
import { AuthRequest } from "../../../../types";

//* Controlador para registrar un nuevo restaurante y manager
export const registerRestaurantAndManagerController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurant: restaurantData, manager: managerData } = req.body;

    const result = await RestaurantService.registerRestaurantAndManager(restaurantData, managerData);
    res.status(201).json(result);
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
    const restaurants = await RestaurantService.getAllRestaurants();

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
    const restaurant = await RestaurantService.getRestaurantById(req.params.id);

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
    const updatedRestaurant = await RestaurantService.updateRestaurant(req.params.id, req.body);

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
    const restaurants = await RestaurantService.getRestaurantsByManagerId(req.params.id);

    if (!restaurants) {
      res.status(404).json({ message: "No se encontraron restaurantes para este manager" });
      return;
    }

    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los restaurantes", error });
  }
};
