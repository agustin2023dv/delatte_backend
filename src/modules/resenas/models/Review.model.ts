import { IReview } from "@delatte/shared/interfaces";
import mongoose, { Schema, Document } from "mongoose";

// 🟢 Submodelo de Reportes
const ReportSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  motivo: { type: String, required: true },
  fecha: { type: Date, default: Date.now },
});

// 🟢 Submodelo de Respuestas
const RespuestaSchema = new Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mensaje: { type: String, required: true, maxlength: 500 },
  fecha: { type: Date, default: Date.now },
});

// 🟢 Modelo Principal de Review
const ReviewSchema = new Schema<IReview>({
  restaurante: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  calificacion: { type: Number, min: 1, max: 5, required: true },
  comentario: { type: String, required: true, maxlength: 500 },
  fecha: { type: Date, default: Date.now },
  status: { type: String, enum: ["publicada", "reported", "borrada"], default: "publicada", index: true },
  ultimaActualizacion: { type: Date },

  // 🔹 Relaciones con subdocumentos
  reportes: { type: [ReportSchema], default: [] },
  respuestas: { type: [RespuestaSchema], default: [] },
});

// 🟢 Middleware para actualizar automáticamente `ultimaActualizacion`
ReviewSchema.pre("findOneAndUpdate", function (next) {
  this.set({ ultimaActualizacion: new Date() });
  next();
});

ReviewSchema.index({ restaurante: 1, status: 1 }); // Filtrar reviews de un restaurante por estado
ReviewSchema.index({ usuario: 1, fecha: -1 }); // Ordenar reviews de un usuario por fecha
ReviewSchema.index({ calificacion: 1, fecha: -1 }); // Consultas por calificación ordenadas por fecha
ReviewSchema.index({ "reportes.userId": 1 }); // Consultar reportes por usuario específico
ReviewSchema.index({ "respuestas.usuario": 1, fecha: -1 }); // Ordenar respuestas de usuario por fecha

export const Review = mongoose.model<IReview>("Review", ReviewSchema, "resenas");