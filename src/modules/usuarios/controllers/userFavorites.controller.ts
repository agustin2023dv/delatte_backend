import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { Response } from "express";
import { inject } from "inversify";
import { AuthRequest } from "../../../../types";
import { UserFavoritesService } from "../services/userFavorites.service";
import { USER_FAVORITES_TYPES } from "../types/userFavorites.types";
import { authMiddleware } from "../../../middlewares/auth.middleware";

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
  }

  @httpDelete("/")
  async removeFavoriteRestaurant(req: AuthRequest, res: Response): Promise<void> {
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

      const response = await this.userFavoritesService.removeFavoriteRestaurant(req.user.id, restaurantId);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
    }
  }
}
