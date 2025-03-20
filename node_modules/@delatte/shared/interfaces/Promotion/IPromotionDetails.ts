/**
 * Contiene la información detallada de una promoción.
 * @interface IPromotionDetails
 */
export interface IPromotionDetails {
    /**
     * Título de la promoción.
     * @example "Descuento de Navidad"
     */
    titulo: string;
  
    /**
     * Descripción detallada de la promoción.
     * @example "Obtén un 20% de descuento en todas las comidas."
     */
    descripcion: string;
  
    /**
     * Fecha de inicio de la promoción.
     * @example new Date("2023-12-01")
     */
    fechaInicio: Date;
  
    /**
     * Fecha de finalización de la promoción.
     * @example new Date("2023-12-31")
     */
    fechaFin: Date;
  
    /**
     * Porcentaje de descuento aplicado en la promoción.
     * @example 20
     */
    descuento: number;

       /**
     * Fecha y hora en que se creó la promoción.
     * @example new Date("2023-11-15T10:00:00Z")
     */
       fechaCreacion: Date;
  }
  