import { IPromotion } from "@delatte/shared/interfaces/IPromotion";
import mongoose, { Schema, Model } from "mongoose";

const PromotionSchema: Schema = new Schema({
  restaurante: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  titulo: { type: String, required: true },
  descripcion: { type: String, required: true, maxlength: 500 },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
  descuento: { type: Number, required: true, min: 1, max: 100 },
  estado: { type: String, enum: ["activa", "expirada", "programada"], default: "programada" },
  fechaCreacion: { type: Date, default: Date.now },
});

// Índice para optimizar búsquedas
PromotionSchema.index({ restaurante: 1 });
PromotionSchema.index({ fechaInicio: 1 });

// Middleware para actualizar automáticamente el estado
PromotionSchema.pre("save", function (this: IPromotion, next) {
    const now = new Date();
  
    if (this.fechaInicio && this.fechaFin) {
      if (this.fechaInicio <= now && this.fechaFin >= now) {
        this.estado = "activa";
      } else if (this.fechaFin < now) {
        this.estado = "expirada";
      }
    }
  
    next();
  });

const Promotion: Model<IPromotion> = mongoose.model<IPromotion>("Promocion", PromotionSchema, "promociones");
export default Promotion;
