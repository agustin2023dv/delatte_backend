/**
 * DTO para crear una nueva promoción.
 */
export interface ICreatePromotionDTO {
    /**
     * Título de la promoción.
     */
    titulo: string;
  
    /**
     * Descripción de la promoción (máx. 500 caracteres).
     */
    descripcion: string;
  
    /**
     * Fecha de inicio de la promoción.
     */
    fechaInicio: string;
  
    /**
     * Fecha de finalización.
     */
    fechaFin: string;
  
    /**
     * Porcentaje de descuento (1 a 100).
     */
    descuento: number;
  
    /**
     * Para superadmin: uno o varios IDs de restaurantes.
     * Para manager: opcional o ignorado en backend.
     */
    restauranteIds?: string[]; // Usás uno si es manager, varios si es superadmin
  }
  