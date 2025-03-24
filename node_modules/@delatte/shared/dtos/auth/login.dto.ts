/**
 * DTO para login de usuarios (customer, manager, superadmin).
 */
export interface ILoginDTO {
    /**
     * Correo electrónico del usuario.
     */
    email: string;
  
    /**
     * Contraseña del usuario.
     */
    password: string;
  }
  