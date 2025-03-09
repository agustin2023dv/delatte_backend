import { Document, ObjectId } from "mongoose";

export interface IPromotion extends Document {
  _id: ObjectId | string;
  restaurante: ObjectId | string;  // Relación con el restaurante
  titulo: string;
  descripcion: string;
  fechaInicio: Date;
  fechaFin: Date;
  descuento: number;  // % de descuento
  estado: "activa" | "expirada" | "programada"; // Estado de la promo
  fechaCreacion: Date;
}
