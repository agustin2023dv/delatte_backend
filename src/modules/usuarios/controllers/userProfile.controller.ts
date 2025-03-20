import { Response } from "express";
<<<<<<< Updated upstream
import { 
  getUserByIDService,
  getUserDataService, 
  updateUserDataService 
} from "../services/userProfile.service";
import { AuthRequest } from "../../../../types";



//** Controlador para obtener el perfil del usuario **
export const getUserProfileController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const user = await getUserDataService(req.user.id);
    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
=======
import { inject } from "inversify";
import { controller, httpGet, httpPut } from "inversify-express-utils";
import { AuthRequest } from "../../../../types";
import { UserProfileService } from "../services/userProfile.service";
import { USER_PROFILE_TYPES } from "../types/userProfile.types";

@controller("/api/v1/profile")
export class UserProfileController {
  constructor(
    @inject(USER_PROFILE_TYPES.UserProfileService)
    private userProfileService: UserProfileService
  ) {}

  // 📌 Obtener perfil del usuario autenticado
  @httpGet("/")
  async getUserProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const user = await this.userProfileService.getUserData(req.user.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error });
    }
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
//** Controlador para actualizar el perfil del usuario **
export const updateUserDataController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const updatedUser = await updateUserDataService(req.body);
    res.status(200).json({ message: "Datos del usuario actualizados con éxito", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar los datos del usuario", error: error instanceof Error ? error.message : "Error desconocido" });
  }
};


export const getUserByIDController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    
      const {id} = req.params;

      if (!id) {
           res.status(404).json({ message: "Usuario no encontrado" });
           return;
      }

      const user = getUserByIDService(id);
      
      res.status(200).json(user);
  } catch (error) {
      console.error("Error en getUserByIDController:", error);
      res.status(500).json({ message: "Error interno del servidor" });
      return;
  }
};



=======
  // 📌 Actualizar perfil del usuario autenticado
  @httpPut("/")
  async updateUserData(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const updatedUser = await this.userProfileService.updateUserData(req.body);
      res.status(200).json({ message: "Datos actualizados con éxito", user: updatedUser });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar los datos", error });
    }
  }
}
>>>>>>> Stashed changes
