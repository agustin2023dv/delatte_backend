/**
 * DTO para representar la cantidad de reservas agrupadas por día.
 */
export interface IDailyReservationsDTO {
    /**
     * Fecha en formato YYYY-MM-DD
     */
    _id: string;
  
    /**
     * Total de reservas ese día
     */
    total: number;
  }
  