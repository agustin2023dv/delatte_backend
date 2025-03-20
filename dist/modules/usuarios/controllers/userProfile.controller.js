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
exports.UserProfileController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const userProfile_service_1 = require("../services/userProfile.service");
const userProfile_types_1 = require("../types/userProfile.types");
let UserProfileController = class UserProfileController {
    userProfileService;
    constructor(userProfileService) {
        this.userProfileService = userProfileService;
    }
    // 📌 Obtener perfil del usuario autenticado
    async getUserProfile(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const user = await this.userProfileService.getUserData(req.user.id);
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: "Error en el servidor", error });
        }
    }
    // 📌 Actualizar perfil del usuario autenticado
    async updateUserData(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const updatedUser = await this.userProfileService.updateUserData(req.body);
            res.status(200).json({ message: "Datos actualizados con éxito", user: updatedUser });
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar los datos", error });
        }
    }
};
exports.UserProfileController = UserProfileController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "getUserProfile", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserProfileController.prototype, "updateUserData", null);
exports.UserProfileController = UserProfileController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/profile"),
    __param(0, (0, inversify_1.inject)(userProfile_types_1.USER_PROFILE_TYPES.UserProfileService)),
    __metadata("design:paramtypes", [userProfile_service_1.UserProfileService])
], UserProfileController);
