// src/modules/users/controllers/userAuth.controller.ts

import { controller, httpPost, httpPut, httpGet, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { AuthRequest } from "../../../../types";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { IUserAuthService } from "../interfaces/IUserAuthService";

@controller("/api/v1/users")
export class UserAuthController {
  constructor(
    @inject(USER_ACCESS_TYPES.UserAuthService)
    private userAuthService: IUserAuthService
  ) {}

  /**
   * @swagger
   * /api/v1/users/email-verification:
   *   get:
   *     summary: Verificación de email
   *     description: Verifica el token de email enviado al usuario. Redirige al frontend con resultado.
   *     tags:
   *       - Users
   *     parameters:
   *       - in: query
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       302:
   *         description: Redirección al frontend con estado
   */
  /**
   * @swagger
   * /api/v1/users/email-verification:
   *   get:
   *     summary: Verificación de email
   *     description: Verifica el token de email enviado al usuario. Redirige al frontend con resultado.
   *     tags:
   *       - Users
   *     parameters:
   *       - in: query
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       302:
   *         description: Redirección al frontend con estado
   */
  @httpGet("/email-verification")
  async verificarEmailDesdeLink(@request() req: Request, @response() res: Response): Promise<void> {
    const token = req.query.token as string;
    const frontendUrl = process.env.FRONTEND_URL_WEB || "http://localhost:8082";

    if (!token) {
      return res.redirect(`${frontendUrl}/verify-email?status=error&message=TokenNoProporcionado`);
    }

    try {
      const result = await this.userAuthService.verifyEmailToken(token);
      const status = result.success ? "success" : "error";
      return res.redirect(`${frontendUrl}/verify-email?status=${status}&message=${encodeURIComponent(result.message)}`);
    } catch (error) {
      return res.redirect(`${frontendUrl}/verify-email?status=error&message=ServerError`);
    }
  }

  @httpPut("/password", authMiddleware)
  async cambiarContrasena(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const result = await this.userAuthService.changePassword(
        req.user.id,
        oldPassword,
        newPassword,
        confirmNewPassword
      );

      res.status(200).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  @httpPost("/password-reset-requests")
  async requestPasswordReset(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.userAuthService.requestPasswordReset(email);
      res.status(200).json({ message: "Correo de restablecimiento enviado" });
    } catch (error) {
      res.status(404).json({
        message: error instanceof Error ? error.message : "Usuario no encontrado",
      });
    }
  }

  @httpPost("/password-resets")
  async resetPassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;
      await this.userAuthService.resetPassword(token, newPassword);
      res.status(200).json({ message: "Contraseña restablecida con éxito" });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Token inválido o expirado",
      });
    }
  }
}
