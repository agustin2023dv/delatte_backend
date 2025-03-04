import { Document, ObjectId } from 'mongoose';
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
}
export interface IReviewProps {
    restaurantId: string;
    isManager: boolean;
}
//# sourceMappingURL=IReview.d.ts.map