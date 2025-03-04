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
const UserSchema = new mongoose_1.Schema({
    nombre: { type: String }, // Nombre del usuario
    apellido: { type: String }, // Apellido del usuario
    email: { type: String, unique: true }, // Correo único del usuario
    password: { type: String }, // Contraseña hasheada
    isVerified: { type: Boolean, default: false }, // Indicador de si el email del usuario ha sido verificado
    emailToken: { type: String }, // Token de verificación de email
    dob: { type: Date }, // Fecha de nacimiento del usuario
    phone: { type: String }, // Número de teléfono del usuario
    isActive: { type: Boolean, default: true },
    addresses: { type: [{ type: String }], default: [] }, // Lista de domicilios del usuario
    favoriteRestaurants: { type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Restaurant' }], default: [] },
    reviews: { type: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Review' }], default: [] },
    profileImage: { type: String, default: "Imagen de perfil" }, // URL de la imagen de perfil del usuario
    role: { type: String, enum: ['customer', 'manager', 'superadmin'], default: 'customer' }, // Rol del usuario, con valor por defecto 'customer'
});
const User = mongoose_1.default.model('User', UserSchema, 'usuarios');
exports.default = User;
