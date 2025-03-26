/**
 * DTO para actualizar un menú existente.
 */
export interface IUpdateMenuDTO {
    tipo?: "Comida" | "Bebidas" | "Postres";
    items?: {
        nombre: string;
        descripcion: string;
        precio: number;
    }[];
}
//# sourceMappingURL=update-menu.dto.d.ts.map