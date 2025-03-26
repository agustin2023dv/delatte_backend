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
    favorites?: string[];
}
//# sourceMappingURL=user-profile-response.dto.d.ts.map