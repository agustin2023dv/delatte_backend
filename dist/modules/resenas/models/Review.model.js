"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// 🟢 Submodelo de Reportes
const ReportSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    motivo: { type: String, required: true },
    fecha: { type: Date, default: Date.now },
});
// 🟢 Submodelo de Respuestas
const RespuestaSchema = new mongoose_1.Schema({
    usuario: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    mensaje: { type: String, required: true, maxlength: 500 },
    fecha: { type: Date, default: Date.now },
});
// 🟢 Modelo Principal de Review
const ReviewSchema = new mongoose_1.Schema({
    restaurante: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant", required: true, index: true },
    usuario: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true, index: true },
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
exports.Review = mongoose_1.default.model("Review", ReviewSchema, "resenas");
