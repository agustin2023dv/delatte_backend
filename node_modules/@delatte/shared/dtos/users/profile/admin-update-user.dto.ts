/**
 * DTO para que el superadmin pueda editar cualquier campo permitido del usuario.
 */
export interface IAdminUpdateUserDTO {
    nombre?: string;
    apellido?: string;
    email?: string;
    phone?: string;
    dob?: string;
    profileImage?: string;
    addresses?: string[];
    isVerified?: boolean;
    isActive?: boolean;
    role?: "customer" | "manager" | "superadmin";
  }
  