import { Schema, model } from "mongoose";
import { IReservation } from "@delatte/shared/interfaces";
import mongoose from "mongoose";

/* 
 * Subschema: Información del Restaurante 
 */
const RestaurantInfoSchema = new Schema(
  {
    restaurante: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  },
  { _id: false }
);

/* 
 * Subschema: Información del Usuario 
 */
const UserInfoSchema = new Schema(
  {
    usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { _id: false }
);

/* 
 * Subschema: Datos de la Reserva 
 */
const ReservationDataSchema = new Schema(
  {
    fecha: { type: Date, required: true },
    horario: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
    cantidadAdultos: { type: Number, required: true, min: 1, default: 1 },
    cantidadNinios: { type: Number, min: 0, default: 0 },
    notas: { type: String, maxlength: 500 },
  },
  { _id: false }
);

/* 
 * Subschema: Estado de la Reserva 
 */
const ReservationStatusSchema = new Schema(
  {
    estado: { type: String, enum: ["Pasada", "Confirmada", "Cancelada"], default: "Confirmada" },
    fechaCreacion: { type: Date, default: Date.now },
  },
  { _id: false }
);

/* 
 * Schema Principal: Reservation 
 */
const ReservationSchema = new Schema<IReservation>({
  restaurantInfo: { type: RestaurantInfoSchema, required: true },
  userInfo: { type: UserInfoSchema, required: true },
  reservationData: { type: ReservationDataSchema, required: true },
  reservationStatus: { type: ReservationStatusSchema, required: true },
});

// Índices para optimización de consultas
ReservationSchema.index({ "restaurantInfo.restaurante": 1 });
ReservationSchema.index({ "userInfo.usuario": 1 });
ReservationSchema.index({ "reservationData.fecha": 1 });
ReservationSchema.index(
  { "restaurantInfo.restaurante": 1, "reservationData.fecha": 1, "reservationData.horario": 1 },
  { unique: false }
);

/* 
 * Middleware: Actualizar automáticamente estado a "Pasada" 
 */
ReservationSchema.pre("save", function (next) {
  const now = new Date();
  const reservationDate = this.reservationData?.fecha;

  if (this.isModified("reservationData.fecha") && reservationDate instanceof Date) {
    if (reservationDate < now && this.reservationStatus.estado === "Confirmada") {
      this.reservationStatus.estado = "Pasada";
    }
  }
  next();
});

// Exportar modelo
const Reservation = model<IReservation>("Reservation", ReservationSchema, "reservas");
export default Reservation;
