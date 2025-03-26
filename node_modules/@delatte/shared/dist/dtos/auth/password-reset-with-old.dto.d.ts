/**
 * DTO para cambiar la contraseña autenticado, ingresando la contraseña actual y la nueva.
 */
export interface IPasswordResetWithOldDTO {
    /**
     * Contraseña actual del usuario.
     */
    oldPassword: string;
    /**
     * Nueva contraseña deseada.
     */
    newPassword: string;
    /**
     * Confirmación de la nueva contraseña.
     */
    confirmNewPassword: string;
}
//# sourceMappingURL=password-reset-with-old.dto.d.ts.map