import { Document, ObjectId } from 'mongoose';

export interface IReview extends Document {
    _id: ObjectId; // Identificador único de la reseña
    restaurante: ObjectId  | { _id: ObjectId | string; nombre: string ; direccion: string  }; // Relación con el restaurante reseñado
    usuario: ObjectId | { _id: ObjectId | string; nombre: string; apellido: string ; email: string  } ; // Relación con el usuario que hizo la reseña
    calificacion: number; // Calificación del restaurante, p. ej. del 1 al 5
    comentario: string; // Comentario de la reseña
    fecha: Date; // Fecha en la que se hizo la reseña
    ultimaActualizacion?: Date; // Fecha de última actualización si la reseña fue editada
}

export interface IReviewProps {
    restaurantId: string;
    isManager: boolean; 
}
