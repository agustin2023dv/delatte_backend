/**
 * DTO para actualizar una promoción existente.
 */
export interface IUpdatePromotionDTO {
    titulo?: string;
    descripcion?: string;
    fechaInicio?: string;
    fechaFin?: string;
    descuento?: number;
  }
  