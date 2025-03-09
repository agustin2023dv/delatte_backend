import { Document, ObjectId } from 'mongoose';
export type ReviewStatus = "publicada" | "reported" | "borrada";

export interface IReview extends Document {
    _id: ObjectId; // Identificador único de la reseña
    restaurante: ObjectId | { _id: ObjectId | string; nombre: string; direccion: string };
    usuario: ObjectId | { _id: ObjectId | string; nombre: string; apellido: string; email: string };
    calificacion: number; // Calificación del 1 al 5
    comentario: string; // Comentario de la reseña
    fecha: Date; // Fecha en la que se hizo la reseña
    ultimaActualizacion?: Date; // Fecha de última actualización si fue editada
    status: ReviewStatus; // Estado de la reseña ("publicada", "reported", etc.)
    reportes?: { userId: ObjectId; motivo: string; fecha: Date }[]; // Reportes de usuarios
    respuestas?: {
        usuario: ObjectId | { _id: ObjectId | string; nombre: string };
        mensaje: string;
        fecha: Date;
    }[];
}
