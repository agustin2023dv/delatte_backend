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
    @inject(USER_ACCESS_TYPES.UserAuthRepository) private userAuthRepository: IUserAuthRepository,
    @inject(USER_MANAGEMENT_TYPES.UserManagementRepository)private userManagementRepository: IUserManagementRepository,
    @inject(USER_PROFILE_TYPES.UserProfileRepository) private userProfileRepository: IUserProfileRepository,
    @inject(USER_ACCESS_TYPES.UserTokenRepository) private userTokenRepository: IUserTokenRepository,
    @inject(USER_ACCESS_TYPES.EmailService) private emailService: EmailService,
    @inject(USER_ACCESS_TYPES.PasswordHasher) private passwordHasher: IPasswordHasher
  ) {}

<<<<<<< Updated upstream
// 📌 Hashear contraseña
export const hashPasswordService = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, saltRounds);
};

// 📌 Comparar contraseñas
export const comparePasswordService = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

// 📌 Solicitar restablecimiento de contraseña
export const requestPasswordResetService = async (email: string): Promise<void> => {
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
};

// 📌 Restablecer contraseña
export const resetPasswordService = async (token: string, userId: string, newPassword: string): Promise<void> => {
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
};

// 📌 Cambiar contraseña
export const changePasswordService = async (
  userId: string,
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string
) => {
  if (newPassword !== confirmNewPassword) throw new Error("Las contraseñas no coinciden");

  const user = await BaseUserRepository.findUserById(userId);
  if (!user) throw new Error("Usuario no encontrado");

  if (!(await comparePasswordService(oldPassword, user.password))) throw new Error("La contraseña actual es incorrecta");
=======
  async verifyEmailToken(emailToken: string): Promise<{ success: boolean; message: string; redirectUrl: string }> {
    const user = await this.userAuthRepository.findUserByEmailToken(emailToken);
    if (!user) {
      return {
        success: false,
        message: "Token inválido",
        redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenInvalido",
      };
    } 

    await this.userManagementRepository.verifyUserEmail(user._id.toString());
  
    return {
      success: true,
      message: "Email verificado correctamente",
      redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=success&message=EmailVerificado",
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
      to: user.email,
      subject: "Restablecimiento de contraseña",
      text: `Hola ${user.nombre},\n\nPuedes restablecer tu contraseña aquí: ${resetLink}`,
      html: `<h1>Hola ${user.nombre}!</h1><p>Puedes restablecer tu contraseña aquí:</p><a href="${resetLink}">Restablecer contraseña</a>`,
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<void> {
    const resetTokenEntry = await this.userTokenRepository.findResetTokenByToken(token);
    if (!resetTokenEntry) throw new Error("Token inválido o expirado");

    const userId = resetTokenEntry.userId.toString(); 

    const user = await this.userManagementRepository.getUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    user.password = await this.passwordHasher.hash(newPassword);
    await this.userAuthRepository.updateUserPassword(user._id.toString(), user.password);
    await this.userTokenRepository.deleteResetToken(user._id.toString());
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string, confirmNewPassword: string) {
    if (newPassword !== confirmNewPassword) {
      throw new Error("Las contraseñas no coinciden");
    }

    const user = await this.userProfileRepository.findUserById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    const isMatch = await this.passwordHasher.compare(oldPassword, user.password);
    if (!isMatch) throw new Error("La contraseña actual es incorrecta");

    const hashedPassword = await this.passwordHasher.hash(newPassword);
    await this.userAuthRepository.updateUserPassword(userId, hashedPassword);
>>>>>>> Stashed changes

  user.password = await hashPasswordService(newPassword);
  await user.save();

  return { message: "Contraseña actualizada correctamente" };
};
