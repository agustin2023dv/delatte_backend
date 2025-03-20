"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileRepository = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const mongoose_1 = require("mongoose");
const inversify_1 = require("inversify");
let UserProfileRepository = class UserProfileRepository {
    // 📌 Buscar usuario por email
    async findUserByEmail(email) {
        return await User_model_1.default.findOne({ email });
    }
    // 📌 Buscar usuario por ID
    async findUserById(userId) {
        if (!mongoose_1.Types.ObjectId.isValid(userId))
            throw new Error("ID de usuario no válido");
        return await User_model_1.default.findById(userId);
    }
    // 📌 Obtener datos del usuario (sin datos sensibles)
    async getUserData(userId) {
        if (!mongoose_1.Types.ObjectId.isValid(userId))
            throw new Error("ID de usuario no válido");
        return await User_model_1.default.findById(userId).lean();
    }
    // 📌 Actualizar datos del usuario
    async updateUserData(userData) {
        const user = await User_model_1.default.findOne({ email: userData.email });
        if (!user)
            throw new Error("Usuario no encontrado");
        user.phone = userData.phone || user.phone;
        user.addresses = userData.addresses || user.addresses;
        user.profileImage = userData.profileImage || user.profileImage;
        // La fecha de nacimiento solo puede modificarse una vez
        if (!user.dob && userData.dob) {
            user.dob = userData.dob;
        }
        return await user.save();
    }
};
exports.UserProfileRepository = UserProfileRepository;
exports.UserProfileRepository = UserProfileRepository = __decorate([
    (0, inversify_1.injectable)()
], UserProfileRepository);
