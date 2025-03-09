import { Document, ObjectId } from "mongoose";
export interface IPromotion extends Document {
    _id: ObjectId | string;
    restaurante: ObjectId | string;
    titulo: string;
    descripcion: string;
    fechaInicio: Date;
    fechaFin: Date;
    descuento: number;
    estado: "activa" | "expirada" | "programada";
    fechaCreacion: Date;
}
//# sourceMappingURL=IPromotion.d.ts.map