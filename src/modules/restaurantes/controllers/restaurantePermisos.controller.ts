import { controller, httpGet } from "inversify-express-utils";
import { Response } from "express";
import { inject } from "inversify";
import { AuthRequest } from "../../../../types";
<<<<<<< Updated upstream
import { checkUserRoleInRestaurantService } from "../services/restaurantePermisos.service";

=======
import { IRestaurantPermissionsService } from "../interfaces/IRestaurantPermissionsService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { RESTAURANT_PERMISSIONS_TYPES } from "../types/restaurantPermissions.types";
>>>>>>> Stashed changes

@controller("/api/v1/restaurants")
export class RestaurantPermissionsController {
  constructor(
    @inject(RESTAURANT_PERMISSIONS_TYPES.IRestaurantPermissionsService)
    private restaurantPermissionsService: IRestaurantPermissionsService
  ) {}

  @httpGet("/:restaurantId/is-manager", authMiddleware)
  async isManager(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const { restaurantId } = req.params;
      const userId = req.user.id;
      const isManager = await this.restaurantPermissionsService.checkUserRoleInRestaurant(restaurantId, userId);

      res.status(200).json({ isManager });
    } catch (error) {
      console.error("Error verificando rol:", error);

      if (error instanceof Error) {
        if (error.message === "Restaurante no encontrado") {
          res.status(404).json({ message: error.message });
          return;
        }
        res.status(500).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: "Error interno del servidor" });
    }
<<<<<<< Updated upstream

    const { restaurantId } = req.params;
    const userId = req.user.id;
    const isManager = await checkUserRoleInRestaurantService(restaurantId, userId);

    res.status(200).json({ isManager });
  } catch (error) {
    console.error("Error verificando rol:", error);

    if (error === "Restaurante no encontrado") {
      res.status(404).json({ message: error });
      return;
    }

    res.status(500).json({ message: "Error interno del servidor" });
  }
};
=======
  }
}
>>>>>>> Stashed changes
