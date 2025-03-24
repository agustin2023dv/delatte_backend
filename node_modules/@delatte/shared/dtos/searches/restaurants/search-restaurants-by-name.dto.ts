/**
 * DTO para búsquedas por nombre de restaurante.
 */
export interface ISearchRestaurantsByNameDTO {
    /**
     * Texto a buscar (nombre del restaurante).
     */
    q: string;
  
    /**
     * Límite de resultados a devolver.
     * @default 10
     */
    limit?: number;
  }
  