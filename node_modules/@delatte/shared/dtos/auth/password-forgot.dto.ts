/**
 * DTO para restablecer la contraseña olvidada mediante el link enviado por email.
 */
export interface IPasswordForgotDTO {
    /**
     * Token de verificación recibido por email.
     */
    token: string;
  
    /**
     * Nueva contraseña a establecer.
     */
    newPassword: string;
  
    /**
     * Confirmación de la nueva contraseña.
     */
    confirmNewPassword: string;
  }
  