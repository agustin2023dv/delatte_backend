/**
 * DTO de salida para retornar información de una promoción.
 */
export interface IPromotionResponseDTO {
    _id: string;
    restaurante: {
        _id: string;
        nombre: string;
        direccion: string;
    };
    titulo: string;
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
    descuento: number;
    estado: "activa" | "expirada" | "programada";
    fechaCreacion: string;
}
//# sourceMappingURL=promotion-response.dto.d.ts.map