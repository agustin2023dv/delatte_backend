import { controller, httpGet, httpPatch, httpDelete, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { UserManagementService } from "../services/userManagement.service";
import { USER_MANAGEMENT_TYPES } from "../types/userManagement.types";
import { UserProfileTransformer } from "src/transformers/user.profile.transformer";

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
      const transformed = users.map(UserProfileTransformer.toResponseDTO);
      res.status(200).json(transformed);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener usuarios", error });
    }
  }

  @httpGet(":id")
  async getUserDetails(req: Request, res: Response): Promise<void> {
    try {
      const user = await this.userManagementService.getUserDetails(req.params.id);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      const response = UserProfileTransformer.toResponseDTO(user);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener perfil", error });
    }
  }

  @httpPatch(":id/suspension")
  async suspendUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await this.userManagementService.suspendUser(req.params.id);
      if (!updatedUser) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      const response = UserProfileTransformer.toResponseDTO(updatedUser);
      res.status(200).json({ message: "Usuario suspendido con éxito", user: response });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @httpDelete(":id")
  async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      await this.userManagementService.deleteUser(req.params.id);
      res.status(200).json({ message: "Usuario eliminado con éxito" });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  @httpPut(":id")
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await this.userManagementService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }
      const response = UserProfileTransformer.toResponseDTO(updatedUser);
      res.status(200).json({ message: "Usuario actualizado con éxito", user: response });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
