/**
 * DTO para representar los horarios más populares.
 */
export interface ITopReservationHoursDTO {
    /**
     * Horario (ej: "20:00")
     */
    _id: string;
  
    /**
     * Total de reservas en ese horario
     */
    total: number;
  }
  