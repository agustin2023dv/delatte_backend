/**
 * DTO de entrada para crear una nueva reserva.
 */
export interface ICreateReservationDTO {
  /**
   * ID del restaurante (puede omitirse si el manager está logueado).
   */
  restauranteId?: string;

  /**
   * ID del usuario (puede omitirse si es el customer logueado).
   */
  usuarioId?: string;
  
    /**
     * Fecha de la reserva (formato YYYY-MM-DD).
     */
    fecha: string;
  
    /**
     * Horario de la reserva (ejemplo: "20:00").
     */
    horario: string;
  
    /**
     * Cantidad de adultos incluidos en la reserva.
     */
    cantidadAdultos: number;
  
    /**
     * Cantidad de niños incluidos en la reserva.
     */
    cantidadNinios: number;
  
    /**
     * Notas o comentarios adicionales de la reserva.
     */
    notas?: string;
  }
  