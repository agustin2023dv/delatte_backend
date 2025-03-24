/**
 * DTO para representar promociones que no generaron reservas.
 */
export interface IIneffectivePromotionDTO {
    _id: string;
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
    descuento: number;
    estado: "activa" | "expirada" | "programada";
    fechaCreacion: string;
  }
  