"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileService = void 0;
const inversify_1 = require("inversify");
const userProfile_types_1 = require("../types/userProfile.types");
let UserProfileService = class UserProfileService {
    userProfileRepository;
    constructor(userProfileRepository) {
        this.userProfileRepository = userProfileRepository;
    }
    // 📌 Obtener datos del usuario
    async getUserData(userId) {
        const user = await this.userProfileRepository.getUserData(userId);
        if (!user)
            throw new Error("Usuario no encontrado");
        return user;
    }
    // 📌 Actualizar perfil del usuario
    async updateUserData(userData) {
        return await this.userProfileRepository.updateUserData(userData);
    }
    // 📌 Buscar usuario por ID
    async getUserByID(userId) {
        return await this.userProfileRepository.findUserById(userId);
    }
    // 📌 Buscar usuario por email
    async findUserByEmail(email) {
        return await this.userProfileRepository.findUserByEmail(email);
    }
};
exports.UserProfileService = UserProfileService;
exports.UserProfileService = UserProfileService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(userProfile_types_1.USER_PROFILE_TYPES.UserProfileRepository)),
    __metadata("design:paramtypes", [Object])
], UserProfileService);
