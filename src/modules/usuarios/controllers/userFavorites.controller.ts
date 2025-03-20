import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { Response } from "express";
<<<<<<< Updated upstream
import {
  addFavoriteRestaurantService,
  getUserFavoritesService,
  removeFavoriteRestaurantService,
} from "../services/userFavorites.service";
=======
import { inject } from "inversify";
>>>>>>> Stashed changes
import { AuthRequest } from "../../../../types";
import { UserFavoritesService } from "../services/userFavorites.service";
import { USER_FAVORITES_TYPES } from "../types/userFavorites.types";
import { authMiddleware } from "../../../middlewares/auth.middleware";

<<<<<<< Updated upstream

// **Controlador para obtener favoritos del usuario**

export const getUserFavoritesController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const userId = req.user.id;
    const favorites = await getUserFavoritesService(userId);

    res.status(200).json({ favorites });
  } catch (error) {
    console.error("Error al obtener favoritos:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno del servidor",
    });
=======
@controller("/api/v1/favorites", authMiddleware)
export class UserFavoritesController {
  constructor(
    @inject(USER_FAVORITES_TYPES.UserFavoritesService)
    private userFavoritesService: UserFavoritesService
  ) {}

  @httpGet("/")
  async getUserFavorites(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const favorites = await this.userFavoritesService.getUserFavorites(req.user.id);
      res.status(200).json({ favorites });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
    }
>>>>>>> Stashed changes
  }

  @httpPost("/")
  async addFavoriteRestaurant(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const { restaurantId } = req.body;
      if (!restaurantId) {
        res.status(400).json({ message: "El ID del restaurante es obligatorio" });
        return;
      }

      const response = await this.userFavoritesService.addFavoriteRestaurant(req.user.id, restaurantId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
    }
<<<<<<< Updated upstream

    const userId = req.user.id;
    const { restaurantId } = req.body;

    if (!restaurantId) {
      res.status(400).json({ message: "El ID del restaurante es obligatorio" });
      return;
    }

    const user = await addFavoriteRestaurantService(userId, restaurantId);

    res.status(200).json({
      message: "Restaurante agregado a favoritos con éxito",
      favorites: user.favorites,
    });
  } catch (error) {
    console.error("Error en addFavoriteRestaurantController:", error);
    res.status(500).json({
      message: error instanceof Error ? error.message : "Error interno del servidor",
    });
  }
};
  // **Controlador para eliminar un restaurante de favoritos**
  export const removeFavoriteRestaurantController = async (req: AuthRequest, res: Response): Promise<void> => {
=======
  }

  @httpDelete("/")
  async removeFavoriteRestaurant(req: AuthRequest, res: Response): Promise<void> {
>>>>>>> Stashed changes
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }
<<<<<<< Updated upstream
  
      const userId = req.user.id;
      const { restaurantId } = req.body;
  
=======

      const { restaurantId } = req.body;
>>>>>>> Stashed changes
      if (!restaurantId) {
        res.status(400).json({ message: "El ID del restaurante es obligatorio" });
        return;
      }
<<<<<<< Updated upstream
  
      const user = await removeFavoriteRestaurantService(userId, restaurantId);
  
      res.status(200).json({
        message: "Restaurante eliminado de favoritos con éxito",
        favorites: user.favorites,
      });
    } catch (error) {
      console.error("Error en removeFavoriteRestaurantController:", error);
      res.status(500).json({
        message: error instanceof Error ? error.message : "Error interno del servidor",
      });
    }
  };
=======

      const response = await this.userFavoritesService.removeFavoriteRestaurant(req.user.id, restaurantId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
    }
  }
}
>>>>>>> Stashed changes
