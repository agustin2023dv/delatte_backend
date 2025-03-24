/**
 * DTO de salida para retornar datos públicos y editables del perfil del usuario.
 */
export interface IUserProfileResponseDTO {
    nombre: string;
    apellido: string;
    email: string;
    dob?: string;
    phone?: string;
    profileImage?: string;
    addresses?: string[];
    favorites?: string[]; // solo IDs de restaurantes favoritos
  }
  