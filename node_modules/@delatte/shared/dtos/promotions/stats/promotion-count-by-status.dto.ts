/**
 * DTO para representar la cantidad de promociones agrupadas por estado.
 */
export interface IPromotionCountByStatusDTO {
    _id: "activa" | "expirada" | "programada";
    cantidad: number;
  }
  