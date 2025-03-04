    import { Document, ObjectId } from 'mongoose';

    export interface IReservation extends Document {
      _id: ObjectId | string; // ID de la reserva
      restaurante: ObjectId | { _id: ObjectId | string; nombre: string ; direccion: string  }; // ID del restaurante
      usuario: ObjectId | { _id: ObjectId | string; nombre: string ; apellido: string; email: string, phone: string  }; // ID del usuario que realiza la reserva
      fecha: Date; // Fecha completa de la reserva (día y hora)
      horario: string; // Horario de la reserva (formato HH:MM)
      numAdultos: number; // Número de adultos
      numNinos: number; // Número de niños
      pedidosEspeciales: string; // Nota opcional del usuario (máx. 500 caracteres)
      estado: "Pasada" | "Confirmada" | "Cancelada"; // Estado de la reserva
      fechaCreacion: Date; // Fecha de creación de la reserva
    }
