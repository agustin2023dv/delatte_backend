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
// Define the schema for Restaurant
const RestaurantSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    direccion: { type: String, required: true },
    pais: { type: String, required: true },
    localidad: { type: String, required: true },
    codigoPostal: { type: String },
    telefono: { type: String },
    emailContacto: { type: String },
    logo: { type: String },
    descripcion: { type: String },
    galeriaFotos: [{ type: String }],
    calificacion: { type: Number },
    horarios: [{
            dia: { type: String, enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] },
            horaApertura: { type: String },
            horaCierre: { type: String },
        }],
    capacidadMesas: [{
            cantidad: { type: Number },
            personasPorMesa: { type: Number },
        }],
    menus: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'Menu' }],
    managerPrincipal: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    coManagers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'User' }],
    estaAbierto: { type: Boolean },
    ultimaActualizacion: { type: Date },
    ubicacion: {
        type: {
            type: String,
            enum: ["Point"],
            required: true,
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    tags: [{ type: String }],
});
// Create the model and export it as default
const Restaurant = mongoose_1.default.model('Restaurant', RestaurantSchema, 'restaurantes');
exports.default = Restaurant;
