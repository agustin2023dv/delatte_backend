import { controller, httpPost, httpPut } from "inversify-express-utils";
import { Response } from "express";
import { inject } from "inversify";
import { AuthRequest } from "../../../../types";
<<<<<<< Updated upstream
import {  changePasswordService, requestPasswordResetService, 
    resetPasswordService } from "../services/userAuth.service";
import User from "../models/User.model";
import { UserAuthRepository } from "../repositories/userAuth.repository";



//** Controlador para verificar el email **
export const verificarEmailController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const emailToken = req.query.token as string;
    if (!emailToken) {
      res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenNoProporcionado`);
      return;
=======
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { IUserAuthService } from "../interfaces/IUserAuthService";

@controller("/api/v1/users")
export class UserAuthController {
  constructor(
    @inject(USER_ACCESS_TYPES.UserAuthService) private userAuthService: IUserAuthService
  ) {}

  /**
   * @swagger
   * /api/v1/users/email-verification:
   *   post:
   *     summary: Verificación de correo electrónico
   *     description: Verifica la dirección de correo electrónico de un usuario mediante un token.
   *     tags:
   *       - Users
   *     parameters:
   *       - in: query
   *         name: token
   *         required: true
   *         schema:
   *           type: string
   *         description: Token de verificación enviado por correo electrónico
   *     responses:
   *       200:
   *         description: Correo verificado con éxito
   *       400:
   *         description: Token inválido o expirado
   */
  @httpPost("/email-verification")
  async verificarEmail(req: AuthRequest, res: Response): Promise<void> {
    try {
      const emailToken = req.query.token as string;
      if (!emailToken) {
        res.status(400).json({
          success: false,
          message: "Token no proporcionado",
          redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenNoProporcionado"
        });
        return;
      }

      const result = await this.userAuthService.verifyEmailToken(emailToken);
      res.status(result.success ? 200 : 400).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Error interno del servidor",
        redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=error&message=ServerError"
      });
>>>>>>> Stashed changes
    }
  }

<<<<<<< Updated upstream




//** Controlador para cambiar contraseña **
export const cambiarContrasenaController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    if (!oldPassword || !newPassword || !confirmNewPassword) {
      res.status(400).json({ message: "Todos los campos son obligatorios" });
      return;
    }

    const result = await changePasswordService(req.user.id, oldPassword, newPassword, confirmNewPassword);
    res.status(200).json({ message: result.message });
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    res.status(500).json({ message: "Error interno del servidor" });
=======
  /**
   * @swagger
   * /api/v1/users/password:
   *   put:
   *     summary: Cambiar contraseña de usuario autenticado
   *     description: Permite a un usuario cambiar su contraseña actual.
   *     tags:
   *       - Users
   *     security:
   *       - BearerAuth: []
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               oldPassword:
   *                 type: string
   *                 example: "OldPass123!"
   *               newPassword:
   *                 type: string
   *                 example: "NewSecurePass456!"
   *     responses:
   *       200:
   *         description: Contraseña actualizada con éxito
   *       400:
   *         description: La contraseña actual es incorrecta
   */
  @httpPut("/password", authMiddleware)
  async cambiarContrasena(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }

      const { oldPassword, newPassword, confirmNewPassword } = req.body;
      const result = await this.userAuthService.changePassword(req.user.id, oldPassword, newPassword, confirmNewPassword);
      res.status(200).json({ message: result.message });
    } catch (error) {
      res.status(500).json({ message: "Error interno del servidor" });
    }
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
//** Controlador para solicitar restablecimiento de contraseña **
export const requestPasswordResetController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email } = req.body;
    if (!email) {
      res.status(400).json({ message: "El correo es obligatorio." });
      return;
    }

    await requestPasswordResetService(email);
    res.status(200).json({ message: "Se ha enviado un enlace de restablecimiento a tu correo electrónico." });
  } catch (error) {
    console.error("Error en requestPasswordResetController:", error);
    res.status(500).json({ message: "Error al solicitar el restablecimiento de contraseña." });
=======
  /**
   * @swagger
   * /api/v1/users/password-reset-requests:
   *   post:
   *     summary: Solicitar restablecimiento de contraseña
   *     description: Envia un correo con instrucciones para restablecer la contraseña.
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "usuario@example.com"
   *     responses:
   *       200:
   *         description: Correo de restablecimiento enviado
   *       404:
   *         description: Usuario no encontrado
   */
  @httpPost("/password-reset-requests")
  async requestPasswordReset(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      await this.userAuthService.requestPasswordReset(email);
      res.status(200).json({ message: "Correo de restablecimiento enviado" });
    } catch (error) {
      res.status(404).json({ message: error instanceof Error ? error.message : "Usuario no encontrado" });
    }
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
//** Controlador para restablecer la contraseña con el token **
export const resetPasswordController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { token, userId, newPassword } = req.body;

    if (!token || !userId || !newPassword) {
      res.status(400).json({ message: "Faltan datos requeridos." });
      return;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo." });
      return;
    }

    await resetPasswordService(token, userId, newPassword);
    res.status(200).json({ message: "Contraseña restablecida exitosamente." });
  } catch (error) {
    console.error("Error en resetPasswordController:", error);
    res.status(500).json({ message: "Error al restablecer la contraseña." });
  }
};

=======
  /**
   * @swagger
   * /api/v1/users/password-resets:
   *   post:
   *     summary: Restablecer contraseña con token
   *     description: Permite al usuario establecer una nueva contraseña usando un token de recuperación.
   *     tags:
   *       - Users
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               token:
   *                 type: string
   *                 example: "abcd1234"
   *               newPassword:
   *                 type: string
   *                 example: "NewSecurePass789!"
   *     responses:
   *       200:
   *         description: Contraseña restablecida con éxito
   *       400:
   *         description: Token inválido o expirado
   */
  @httpPost("/password-resets")
  async resetPassword(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { token, newPassword } = req.body;
      await this.userAuthService.resetPassword(token, newPassword);
      res.status(200).json({ message: "Contraseña restablecida con éxito" });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Token inválido o expirado" });
    }
  }
}
>>>>>>> Stashed changes
