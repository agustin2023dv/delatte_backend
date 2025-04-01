import { Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPut } from "inversify-express-utils";
import { AuthRequest } from "../../../../types";
import { UserProfileService } from "../services/userProfile.service";
import { USER_PROFILE_TYPES } from "../types/userProfile.types";
import { UserProfileTransformer } from "src/transformers/user.profile.transformer";

@controller("/api/v1/profile")
export class UserProfileController {
  constructor(
    @inject(USER_PROFILE_TYPES.UserProfileService)
    private userProfileService: UserProfileService
  ) {}

  @httpGet("/")
  async getUserProfile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const user = await this.userProfileService.getUserByID(req.user.id);
      if (!user) {
        res.status(404).json({ message: "Usuario no encontrado" });
        return;
      }

      const response = UserProfileTransformer.toResponseDTO(user);
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ message: "Error en el servidor", error });
    }
  }

  @httpPut("/")
  async updateUserData(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const updatedUser = await this.userProfileService.updateUserData(
        req.user.id,
        req.body
      );

      const response = UserProfileTransformer.toResponseDTO(updatedUser);
      res.status(200).json({ message: "Datos actualizados con éxito", user: response });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar los datos", error });
    }
  }
}