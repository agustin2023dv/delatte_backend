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
exports.UserAuthRepository = void 0;
const inversify_1 = require("inversify");
const User_model_1 = __importDefault(require("../models/User.model"));
let UserAuthRepository = class UserAuthRepository {
    async findUserByEmail(email) {
        return await User_model_1.default.findOne({ email });
    }
    async findUserByEmailToken(emailToken) {
        return await User_model_1.default.findOne({ emailToken });
    }
    async getUserByEmailAndRole(email, role) {
        const user = await User_model_1.default.findOne({ email });
        if (!user)
            throw new Error("Usuario no encontrado");
        if (user.role !== role)
            throw new Error("El usuario no tiene permisos para iniciar sesión");
        return user;
    }
    async updateUserPassword(userId, hashedPassword) {
        await User_model_1.default.findByIdAndUpdate(userId, { password: hashedPassword });
    }
};
exports.UserAuthRepository = UserAuthRepository;
exports.UserAuthRepository = UserAuthRepository = __decorate([
    (0, inversify_1.injectable)()
], UserAuthRepository);
