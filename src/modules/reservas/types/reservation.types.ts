// src/types/reservation.types.ts
import { Types } from "mongoose";

export type ReservationMongoInput = {
  restaurantInfo: {
    restaurante: Types.ObjectId;
  };
  userInfo: {
    usuario: Types.ObjectId;
  };
  reservationData: {
    fecha: Date;
    horario: string;
    cantidadAdultos: number;
    cantidadNinios: number;
    notas?: string;
  };
  reservationStatus: {
    estado: "Confirmada";
    fechaCreacion: Date;
  };
};
