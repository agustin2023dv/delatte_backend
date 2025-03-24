/**
 * DTO para representar el total de reservas por restaurante.
 */
export interface IReservationsByRestaurantDTO {
    /**
     * ID del restaurante
     */
    _id: string;
  
    /**
     * Total de reservas hechas en ese restaurante
     */
    total: number;
  }
  