import { Document, ObjectId } from 'mongoose';
import { IPromotion } from './IPromotion';

export enum DiasSemana {
  Lunes = "Lunes",
  Martes = "Martes",
  Miércoles = "Miércoles",
  Jueves = "Jueves",
  Viernes = "Viernes",
  Sábado = "Sábado",
  Domingo = "Domingo",
}


export interface IRestaurant extends Document {
  _id: ObjectId | string;
  nombre: string;
  direccion: string;
  pais: string;
  localidad: string;
  codigoPostal?: string; // Opcional
  telefono?: string; // Opcional
  emailContacto?: string; // Opcional
  logo?: string; // Opcional
  descripcion?: string; // Opcional
  galeriaFotos?: string[]; // Opcional

  calificacion: number;
  totalReservas: number; // Total de reservas históricas
  totalReviews: number; // Total de reviews recibidas

  promociones?: IPromotion[];
  estaTemporalmenteCerrado: boolean; // Para cierres temporales

  horarios: {
    dia: DiasSemana;
    horaApertura: string;
    horaCierre: string;
  }[];

  capacidadMesas: {
    cantidad: number;
    personasPorMesa: number;
  }[];

  menus: ObjectId[];
  managerPrincipal: ObjectId;
  coManagers: ObjectId[];

  estaAbierto: boolean;
  ultimaActualizacion: Date;

  ubicacion: {
    type: "Point";
    coordinates: [number, number];
  };

  tags?: string[];
}
