import { Document, ObjectId } from 'mongoose';
export interface IReservation extends Document {
    _id: ObjectId | string;
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
        phone: string;
    };
    fecha: Date;
    horario: string;
    numAdultos: number;
    numNinos: number;
    pedidosEspeciales: string;
    estado: "Pasada" | "Confirmada" | "Cancelada";
    fechaCreacion: Date;
}
//# sourceMappingURL=IReservation.d.ts.map