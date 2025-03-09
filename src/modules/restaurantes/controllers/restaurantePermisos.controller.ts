import { Response } from "express"; 
import { AuthRequest } from "../../../../types";
import { checkUserRoleInRestaurantService } from "../services/restaurantePermisos.service";


export const isManagerController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

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