import { Request, Response } from "express";
import { UserManagementService } from "../services/userManagement.service";

export const getUsersController = async (req: Request, res: Response) => {
  try {
    const role = req.query.role as string;
    const users = await UserManagementService.getUsers(role);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error instanceof Error ? error.message : "Error desconocido" });
  }
};

export const getUserDetailsController = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserManagementService.getUserDetails(req.params.id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
  }
};

export const suspendUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserManagementService.suspendUser(id);
    res.status(200).json({ message: "Usuario suspendido con éxito", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al suspender usuario" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await UserManagementService.deleteUser(id);
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al eliminar usuario" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await UserManagementService.updateUser(id, req.body);

    if (!updatedUser) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json({ message: "Usuario actualizado con éxito", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al actualizar usuario" });
  }
};
