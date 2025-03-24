/**
 * DTO para representar la cantidad de reservas agrupadas por semana.
 */
export interface IWeeklyReservationsDTO {
    /**
     * Número de semana ISO (1 a 53)
     */
    _id: number;
  
    /**
     * Total de reservas en esa semana
     */
    total: number;
  }
  