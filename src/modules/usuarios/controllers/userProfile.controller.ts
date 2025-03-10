import { Response } from "express";
import { AuthRequest } from "../../../../types";
import { UserProfileService } from "../services/userProfile.service";

// **Controlador para obtener el perfil del usuario**
export const getUserProfileController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const user = await UserProfileService.getUserData(req.user.id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor", error });
  }
};

// **Controlador para actualizar el perfil del usuario**
export const updateUserDataController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const updatedUser = await UserProfileService.updateUserData(req.body);
    res.status(200).json({ message: "Datos del usuario actualizados con éxito", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar los datos del usuario", error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

// **Controlador para obtener usuario por ID**
export const getUserByIDController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    const user = await UserProfileService.getUserByID(id);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error en getUserByIDController:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};
