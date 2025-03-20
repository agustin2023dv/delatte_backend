import { controller, httpGet, httpPatch, httpDelete, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
<<<<<<< Updated upstream
import { 
  getUsersService, 
  suspendUserService, 
  deleteUserService, 
  updateUserService, 
  getUserDetailsService,
} from "../services/userManagement.service";


export const getUsersController = async (req: Request, res: Response) => {
  try {
    const role = req.query.role as string;
    const users = await getUsersService(role);
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener usuarios", error: error instanceof Error ? error.message : "Error desconocido" });
  }
};
export const getUserDetailsController = async (req: Request, res: Response) : Promise<void> => {
  try {
    const user = await getUserDetailsService(req.params.id);

    if (!user) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.status(200).json(user);
    return;
  } catch (error) {
    res.status(500).json({ message: "Error al obtener perfil", error });
    return;
  }
};
export const suspendUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await suspendUserService(id);
    res.status(200).json({ message: "Usuario suspendido con éxito", user: updatedUser });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al suspender usuario" });
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await deleteUserService(id);
    res.status(200).json({ message: "Usuario eliminado con éxito" });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al eliminar usuario" });
  }
};

export const updateUserController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedUser = await updateUserService(id, req.body);

    if (!updatedUser) {
       res.status(404).json({ message: "Usuario no encontrado" });
       return;
=======
import { inject } from "inversify";
import { UserManagementService } from "../services/userManagement.service";
import { USER_MANAGEMENT_TYPES } from "../types/userManagement.types";

@controller("/api/v1/admin/users")
export class UserManagementController {
  constructor(
    @inject(USER_MANAGEMENT_TYPES.UserManagementService)
    private userManagementService: UserManagementService
  ) {}

  @httpGet("/")
  async getUsers(req: Request, res: Response): Promise<void> {
    try {
      const role = req.query.role as string;
      const users = await this.userManagementService.getUsers(role);
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error });
    }
  }

  @httpGet("/:id")
  async getUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userManagementService.getUserDetails(req.params.id);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener perfil", error });
>>>>>>> Stashed changes
    }
  }
<<<<<<< Updated upstream
};

=======

  @httpPatch("/:id/suspension")
  async suspendUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await this.userManagementService.suspendUser(req.params.id);
      res.status(200).json({ message: "Usuario suspendido con éxito", user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @httpDelete("/:id")
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userManagementService.deleteUser(req.params.id);
      res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @httpPut("/:id")
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await this.userManagementService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      res.status(200).json({ message: "Usuario actualizado con éxito", user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
>>>>>>> Stashed changes
