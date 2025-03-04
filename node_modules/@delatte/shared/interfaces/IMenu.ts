import { Document, ObjectId } from 'mongoose';

export interface IMenuItem {
  nombre: string;
  descripcion: string;
  precio: number;
}

export interface IMenu extends Document {
  _id: ObjectId | string;
  tipo: "Comida" | "Bebidas" | "Postres";
  items: IMenuItem[];
  restaurante: ObjectId; 
}
