/**
 * DTO de salida para retornar un menú completo.
 */
export interface IMenuResponseDTO {
    _id: string;
    restaurante: {
        _id: string;
        nombre: string;
        direccion: string;
    };
    tipo: "Comida" | "Bebidas" | "Postres";
    items: {
        nombre: string;
        descripcion: string;
        precio: number;
    }[];
}
//# sourceMappingURL=menu-response.dto.d.ts.map