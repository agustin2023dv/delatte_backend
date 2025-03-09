import { Document, Types } from "mongoose";
export interface IReservation extends Document {
    _id: Types.ObjectId;
    restaurante: Types.ObjectId;
    usuario: Types.ObjectId;
    fecha: Date;
    horario: string;
    numAdultos: number;
    numNinos: number;
    pedidosEspeciales?: string;
    estado: "Pasada" | "Confirmada" | "Cancelada";
    fechaCreacion: Date;
}
//# sourceMappingURL=IReservation.d.ts.map