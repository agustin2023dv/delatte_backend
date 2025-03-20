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
const SecuritySchema = new mongoose_1.Schema({
    password: { type: String, required: true },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String, default: null },
    isActive: { type: Boolean, default: true },
}, { _id: false });
const ProfileSchema = new mongoose_1.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    dob: { type: Date },
    phone: { type: String },
    profileImage: { type: String, default: "Imagen de perfil" },
    addresses: { type: [String], default: [] },
}, { _id: false });
const FavoritesSchema = new mongoose_1.Schema({
    favoriteRestaurants: { type: [{ type: mongoose_1.Types.ObjectId, ref: "Restaurant" }], default: [] },
}, { _id: false });
const ReviewsSchema = new mongoose_1.Schema({
    reviews: { type: [{ type: mongoose_1.Types.ObjectId, ref: "Review" }], default: [] },
}, { _id: false });
// 📌 Esquema principal de usuario
const UserSchema = new mongoose_1.Schema({
    profile: { type: ProfileSchema, required: true },
    security: { type: SecuritySchema, required: true },
    favorites: { type: FavoritesSchema },
    reviews: { type: ReviewsSchema },
    role: { type: String, enum: ["customer", "manager", "superadmin"], default: "customer" },
});
UserSchema.index({ "profile.email": 1 }, { unique: true }); // ✔ Optimiza búsquedas por email (login, registro)
UserSchema.index({ "profile.nombre": 1, "profile.apellido": 1 }); // ✔ Optimiza búsquedas por nombre + apellido
UserSchema.index({ "security.isVerified": 1 }); // ✔ Optimiza consultas de usuarios verificados
UserSchema.index({ "favorites.favoriteRestaurants": 1 }); // ✔ Optimiza consultas por favoritos
UserSchema.index({ "reviews.reviews": 1 }); // ✔ Optimiza consultas por reviews escritas
UserSchema.index({ "role": 1 }); // ✔ Optimiza consultas por rol (customer, manager, superadmin)
UserSchema.index({ "profile.localidad": 1, "role": 1 }); // ✔ Optimiza búsquedas por localidad y rol
UserSchema.index({ "security.isActive": 1, "role": 1 }); // ✔ Optimiza consultas de usuarios activos según rol
const User = mongoose_1.default.model("User", UserSchema, "usuarios");
exports.default = User;
