import { Request, Response } from "express";
import {
  getTopRestaurantsService,
  getWorstPerformingRestaurantsService,
  getNewRestaurantsService,
  getSaturatedRestaurantsService,
} from "../services/restauranteAnaliticas.service";

// 📊 Restaurantes con más reservas y mejores calificaciones
export const getTopRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getTopRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los mejores restaurantes", error });
  }
};

// 📊 Restaurantes con menos reservas y peores calificaciones
export const getWorstPerformingRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getWorstPerformingRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los restaurantes con peor desempeño", error });
  }
};

// 📊 Restaurantes recién agregados
export const getNewRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getNewRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los restaurantes nuevos", error });
  }
};

// 📊 Restaurantes con alta ocupación y baja disponibilidad
export const getSaturatedRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getSaturatedRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener restaurantes saturados", error });
  }
};
