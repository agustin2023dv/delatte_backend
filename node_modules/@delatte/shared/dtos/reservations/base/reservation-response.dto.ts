/**
 * DTO de salida para devolver los datos completos de una reserva.
 */
export interface IReservationResponseDTO {
    _id: string;
  
    restaurante: {
      _id: string;
      nombre: string;
      direccion: string;
    };
  
    usuario: {
      _id: string;
      nombre: string;
      apellido: string;
      email: string;
    };
  
    fecha: string;
    horario: string;
    estado: "Pendiente" | "Confirmada" | "Cancelada";
    cantidadAdultos: number;
    cantidadNinios: number;
    notas?: string;
    createdAt: string;
  }
  