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
const mongoose_1 = __importStar(require("mongoose"));
const ReservaSchema = new mongoose_1.Schema({
    restaurante: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant", required: true },
    usuario: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User", required: true },
    fecha: { type: Date, required: true },
    horario: { type: String, required: true, match: /^([01]\d|2[0-3]):([0-5]\d)$/ },
    numAdultos: { type: Number, required: true, min: 1, default: 1 },
    numNinos: { type: Number, min: 0, default: 0 },
    pedidosEspeciales: { type: String, maxlength: 500 },
    estado: { type: String, enum: ["Pasada", "Confirmada", "Cancelada"], default: "Confirmada" },
    fechaCreacion: { type: Date, default: Date.now },
});
// Índices para optimización de consultas
ReservaSchema.index({ restaurante: 1 });
ReservaSchema.index({ usuario: 1 });
ReservaSchema.index({ fecha: 1 });
ReservaSchema.index({ restaurante: 1, fecha: 1, horario: 1 }, { unique: false });
// Middleware para actualizar automáticamente reservas pasadas
ReservaSchema.pre("save", function (next) {
    const now = new Date();
    if (this.isModified("fecha") && this.fecha instanceof Date) {
        if (this.fecha < now && this.estado === "Pendiente") {
            this.estado = "Cancelada";
        }
    }
    next();
});
const Reservation = mongoose_1.default.model("Reservation", ReservaSchema, "reservas");
exports.default = Reservation;
