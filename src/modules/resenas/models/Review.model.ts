import { IReview } from "@delatte/shared/interfaces";
import mongoose, { Schema} from "mongoose";

const ReviewSchema = new Schema<IReview>({
  restaurante: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  calificacion: { type: Number, min: 1, max: 5, required: true }, 
  comentario: { type: String, required: true, maxlength: 500 },
  fecha: { type: Date, default: Date.now },
  status: { type: String, enum: ["publicada", "reported", "borrada"], default: "publicada" }, 
  ultimaActualizacion: { type: Date },

  // Reportes de usuarios (Inicializado como array vacío)
  reportes: {
    type: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        motivo: { type: String, required: true },
        fecha: { type: Date, default: Date.now }
      }
    ],
    default: []
  },

  // Respuestas de los restaurantes o managers (Inicializado como array vacío)
  respuestas: {
    type: [
      {
        usuario: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        mensaje: { type: String, required: true, maxlength: 500 },
        fecha: { type: Date, default: Date.now }
      }
    ],
    default: []
  }
});

// Índices para optimizar búsquedas
ReviewSchema.index({ restaurante: 1 });
ReviewSchema.index({ usuario: 1 });
ReviewSchema.index({ status: 1 });

// Middleware para actualizar "ultimaActualizacion" solo cuando se edita
ReviewSchema.pre("findOneAndUpdate", function (next) {
  this.set({ ultimaActualizacion: new Date() });
  next();
});

export const Review = mongoose.model<IReview>("Review", ReviewSchema, "resenas");
