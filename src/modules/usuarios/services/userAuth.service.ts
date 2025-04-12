// ✅ src/modules/users/services/userAuth.service.ts

import { inject, injectable } from "inversify";
import crypto from "crypto";
import { IUserAuthRepository } from "../interfaces/IUserAuthRepository";
import { IUserTokenRepository } from "../interfaces/IUserTokenRepository";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { IUserAuthService } from "../interfaces/IUserAuthService";
import { EmailService } from "../../integrations/services/email.service";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { USER_PROFILE_TYPES } from "../types/userProfile.types";
import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";
import { USER_MANAGEMENT_TYPES } from "../types/userManagement.types";
import { IUserManagementRepository } from "../interfaces/IUserManagementRepository";

@injectable()
export class UserAuthService implements IUserAuthService {
  constructor(
    @inject(USER_ACCESS_TYPES.UserAuthRepository)
    private userAuthRepository: IUserAuthRepository,

    @inject(USER_MANAGEMENT_TYPES.UserManagementRepository)
    private userManagementRepository: IUserManagementRepository,

    @inject(USER_PROFILE_TYPES.UserProfileRepository)
    private userProfileRepository: IUserProfileRepository,

    @inject(USER_ACCESS_TYPES.UserTokenRepository)
    private userTokenRepository: IUserTokenRepository,

    @inject(USER_ACCESS_TYPES.EmailService)
    private emailService: EmailService,

    @inject(USER_ACCESS_TYPES.PasswordHasher)
    private passwordHasher: IPasswordHasher
  ) {}

  async verifyEmailToken(emailToken: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userAuthRepository.findUserByEmailToken(emailToken);
    if (!user) {
      return {
        success: false,
        message: "Token inválido",
      };
    }

    await this.userManagementRepository.verifyUserEmail(user._id.toString());

    return {
      success: true,
      message: "Email verificado correctamente",
    };
  }

  async requestPasswordReset(email: string): Promise<void> {
    const user = await this.userAuthRepository.findUserByEmail(email);
    if (!user) throw new Error("El usuario no existe");

    await this.userTokenRepository.deleteResetToken(user._id.toString());

    const resetToken = crypto.randomBytes(64).toString("hex");
    const hashedToken = await this.passwordHasher.hash(resetToken);

    await this.userTokenRepository.createResetToken(user._id.toString(), hashedToken);

    const resetLink = `http://localhost:8082/screens/auth/forgotPassword/ResetPassword?token=${resetToken}&id=${user._id}`;

    await this.emailService.sendEmail({
      to: user.profile.email,
      subject: "Restablecimiento de contraseña",
      text: `Hola ${user.profile.nombre},\n\nPuedes restablecer tu contraseña aquí: ${resetLink}`,
      html: `<h1>Hola ${user.profile.nombre}!</h1><p>Puedes restablecer tu contraseña aquí:</p><a href="${resetLink}">Restablecer contraseña</a>`,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetTokenEntry = await this.userTokenRepository.findResetTokenByToken(token);
    if (!resetTokenEntry) throw new Error("Token inválido o expirado");

    const userId = resetTokenEntry.userId.toString();
    const user = await this.userManagementRepository.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const hashedPassword = await this.passwordHasher.hash(newPassword);
    await this.userAuthRepository.updateUserPassword(userId, hashedPassword);
    await this.userTokenRepository.deleteResetToken(userId);
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
    if (newPassword !== confirmNewPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    const user = await this.userProfileRepository.findUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await this.passwordHasher.compare(oldPassword, user.security.password);
    if (!isMatch) throw new Error("La contraseña actual es incorrecta");

    const hashedPassword = await this.passwordHasher.hash(newPassword);
    await this.userAuthRepository.updateUserPassword(userId, hashedPassword);

    return { message: "Contraseña actualizada correctamente" };
  }
}
