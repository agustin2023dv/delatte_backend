/**
 * DTO para representar la cantidad de reservas agrupadas por mes.
 */
export interface IMonthlyReservationsDTO {
    /**
     * Mes en formato YYYY-MM
     */
    _id: string;
  
    /**
     * Total de reservas ese mes
     */
    total: number;
  }
  