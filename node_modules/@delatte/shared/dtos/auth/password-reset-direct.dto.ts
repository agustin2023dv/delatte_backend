/**
 * DTO para cambiar directamente la contraseña de un usuario (por un admin o desde el perfil).
 */
export interface IPasswordResetDirectDTO {
    /**
     * Nueva contraseña a establecer.
     */
    newPassword: string;
  
    /**
     * Confirmación de la nueva contraseña.
     */
    confirmNewPassword: string;
  }
  