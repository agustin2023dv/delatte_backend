import mongoose, { Schema, Model } from "mongoose";
import { PromotionService } from "../services/promotion.service";
import { IPromotion } from "@delatte/shared/interfaces/Promotion/IPromotion";
import { BasePromotionModel } from "./PromotionBase.model";

const PromotionSchema: Schema = new Schema({
  ...BasePromotionModel.baseSchema.obj,
});

// Aplicar índices
BasePromotionModel.createIndexes(PromotionSchema);

// Middleware para actualizar el estado antes de guardar
PromotionSchema.pre("save", function (this: IPromotion, next) {
  this.estado = PromotionService.calcularEstado(this.fechaInicio, this.fechaFin);
  next();
});

const Promotion: Model<IPromotion> = mongoose.model<IPromotion>("Promocion", PromotionSchema, "promociones");

export default Promotion;
