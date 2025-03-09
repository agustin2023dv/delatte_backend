import { Response } from "express";
import { AuthRequest } from "../../../../types";
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
    }

    const user = await UserAuthRepository.findUserByEmailToken(emailToken);
    if (!user) {
      res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenInvalido`);
      return;
    }

    user.emailToken = null;
    user.isVerified = true;
    await user.save();

    res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=success&message=EmailVerificado`);
  } catch (error) {
    res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=error&message=ServerError`);
  }
};





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
  }
};

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
  }
};

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

