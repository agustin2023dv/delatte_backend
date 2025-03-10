import { Request, Response } from "express";
import { RestaurantSearchService } from "../services/restauranteBusqueda.service";

// 📌 Controlador para buscar restaurantes por nombre con autocompletado
export const searchRestaurantsByNameController = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.q as string;

    if (!query) {
      res.status(400).json({ message: "Parámetro de búsqueda no válido" });
      return;
    }

    const results = await RestaurantSearchService.searchByName(query);
    res.status(200).json(results);
  } catch (error) {
    console.error("Error en la búsqueda:", error);
    res.status(500).json({ message: "Error en la búsqueda", error });
  }
};
