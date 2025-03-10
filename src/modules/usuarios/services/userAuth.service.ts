import bcrypt from "bcrypt";
import crypto from "crypto";
import { UserAuthRepository } from "../repositories/userAuth.repository";
import { sendEmailService } from "../../integrations/services/email.service";
import { UserTokenRepository } from "../repositories/userToken.repository";
import { BaseUserRepository } from "../repositories/baseUser.repository";

const saltRounds = 10;

export class UserAuthService {
  
  // 📌 Hashear contraseña
  static async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  // 📌 Comparar contraseñas
  static async comparePassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  // 📌 Solicitar restablecimiento de contraseña
  static async requestPasswordReset(email: string): Promise<void> {
    const user = await UserAuthRepository.findUserByEmail(email);
    if (!user) throw new Error("El usuario no existe");

    await UserTokenRepository.deleteResetToken(user._id.toString());

    const resetToken = crypto.randomBytes(64).toString("hex");
    const hashedToken = await bcrypt.hash(resetToken, saltRounds);
    await UserTokenRepository.createResetToken(user._id.toString(), hashedToken);

    const resetLink = `http://localhost:8082/screens/auth/forgotPassword/ResetPassword?token=${resetToken}&id=${user._id}`;
    await sendEmailService({
      to: user.email,
      subject: "Restablecimiento de contraseña",
      text: `Hola ${user.nombre},\n\nPuedes restablecer tu contraseña aquí: ${resetLink}`,
      html: `<h1>Hola ${user.nombre}!</h1><p>Puedes restablecer tu contraseña aquí:</p><a href="${resetLink}">Restablecer contraseña</a>`,
    });
  }

  // 📌 Restablecer contraseña
  static async resetPassword(token: string, userId: string, newPassword: string): Promise<void> {
    const storedToken = await UserTokenRepository.findResetTokenByUserId(userId);
    if (!storedToken || !(await bcrypt.compare(token, storedToken.token))) {
      throw new Error("Token inválido o expirado");
    }

    if (Date.now() - storedToken.createdAt.getTime() > 3600000) {
      await UserTokenRepository.deleteResetToken(userId);
      throw new Error("Token expirado");
    }

    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
    await UserAuthRepository.updateUserPassword(userId, hashedPassword);
    await UserTokenRepository.deleteResetToken(userId);
  }

  // 📌 Cambiar contraseña
  static async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ) {
    if (newPassword !== confirmNewPassword) throw new Error("Las contraseñas no coinciden");

    const user = await BaseUserRepository.findUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!(await this.comparePassword(oldPassword, user.password))) throw new Error("La contraseña actual es incorrecta");

    user.password = await this.hashPassword(newPassword);
    await user.save();

    return { message: "Contraseña actualizada correctamente" };
  }
}
