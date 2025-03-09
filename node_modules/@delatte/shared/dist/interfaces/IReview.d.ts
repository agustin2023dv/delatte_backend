import { Document, ObjectId } from 'mongoose';
export type ReviewStatus = "publicada" | "reported" | "borrada";
export interface IReview extends Document {
    _id: ObjectId;
    restaurante: ObjectId | {
        _id: ObjectId | string;
        nombre: string;
        direccion: string;
    };
    usuario: ObjectId | {
        _id: ObjectId | string;
        nombre: string;
        apellido: string;
        email: string;
    };
    calificacion: number;
    comentario: string;
    fecha: Date;
    ultimaActualizacion?: Date;
    status: ReviewStatus;
    reportes?: {
        userId: ObjectId;
        motivo: string;
        fecha: Date;
    }[];
    respuestas?: {
        usuario: ObjectId | {
            _id: ObjectId | string;
            nombre: string;
        };
        mensaje: string;
        fecha: Date;
    }[];
}
//# sourceMappingURL=IReview.d.ts.map