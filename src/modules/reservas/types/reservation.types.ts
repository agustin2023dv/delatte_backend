// src/types/reservation.types.ts
import { Types } from "mongoose";

export type ReservationMongoInput = {
  usuario: Types.ObjectId;
  restaurante: Types.ObjectId;
  fecha: Date;
  horario: string;
  cantidadAdultos: number;
  cantidadNinios: number;
  notas?: string;
  estado: "Confirmada";
};
