// src/modules/users/interfaces/IUserAuthService.ts

export interface IUserAuthService {
  /**
   * Verifica si un token de email es válido.
   * @param emailToken Token recibido por email
   * @returns Resultado con éxito o error, y mensaje informativo
   */
  verifyEmailToken(emailToken: string): Promise<{
    success: boolean;
    message: string;
  }>;

  /**
   * Permite al usuario cambiar su contraseña actual.
   */
  changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
    confirmNewPassword: string
  ): Promise<{ message: string }>;

  /**
   * Inicia el flujo de restablecimiento de contraseña (envía un email con link).
   */
  requestPasswordReset(email: string): Promise<void>;

  /**
   * Restablece la contraseña usando el token recibido por correo.
   */
  resetPassword(token: string, newPassword: string): Promise<void>;
}
