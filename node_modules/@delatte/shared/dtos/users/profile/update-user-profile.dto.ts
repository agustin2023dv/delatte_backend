/**
 * DTO de entrada para actualizar campos editables del perfil de usuario.
 */
export interface IUpdateUserProfileDTO {
    phone?: string;
    profileImage?: string;
    dob?: string; // Solo se puede establecer si no fue seteado antes
    addresses?: string[];
    email?: string; // En caso de que permitas editar email (requiere verificación posterior)
  }
  