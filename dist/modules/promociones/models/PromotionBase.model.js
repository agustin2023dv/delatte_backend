"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePromotionModel = void 0;
const mongoose_1 = require("mongoose");
class BasePromotionModel {
    static baseSchema = new mongoose_1.Schema({
        restaurante: { type: mongoose_1.Schema.Types.ObjectId, ref: "Restaurant", required: true },
        titulo: { type: String, required: true },
        descripcion: { type: String, required: true, maxlength: 500 },
        fechaInicio: { type: Date, required: true },
        fechaFin: { type: Date, required: true },
        descuento: { type: Number, required: true, min: 1, max: 100 },
        estado: { type: String, enum: ["activa", "expirada", "programada"], default: "programada" },
        fechaCreacion: { type: Date, default: Date.now },
    });
    static createIndexes(schema) {
        schema.index({ estado: 1 });
        schema.index({ fechaCreacion: 1 });
        schema.index({ estado: 1, fechaInicio: 1, fechaFin: 1 });
        schema.index({ restaurante: 1, estado: 1, fechaInicio: 1, fechaFin: 1 });
    }
}
exports.BasePromotionModel = BasePromotionModel;
