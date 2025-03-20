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
exports.UserManagementController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const userManagement_service_1 = require("../services/userManagement.service");
const userManagement_types_1 = require("../types/userManagement.types");
let UserManagementController = class UserManagementController {
    userManagementService;
    constructor(userManagementService) {
        this.userManagementService = userManagementService;
    }
    async getUsers(req, res) {
        try {
            const role = req.query.role;
            const users = await this.userManagementService.getUsers(role);
            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener usuarios", error });
        }
    }
    async getUserDetails(req, res) {
        try {
            const user = await this.userManagementService.getUserDetails(req.params.id);
            if (!user) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json(user);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener perfil", error });
        }
    }
    async suspendUser(req, res) {
        try {
            const updatedUser = await this.userManagementService.suspendUser(req.params.id);
            res.status(200).json({ message: "Usuario suspendido con éxito", user: updatedUser });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async deleteUser(req, res) {
        try {
            await this.userManagementService.deleteUser(req.params.id);
            res.status(200).json({ message: "Usuario eliminado con éxito" });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
    async updateUser(req, res) {
        try {
            const updatedUser = await this.userManagementService.updateUser(req.params.id, req.body);
            if (!updatedUser) {
                res.status(404).json({ message: "Usuario no encontrado" });
                return;
            }
            res.status(200).json({ message: "Usuario actualizado con éxito", user: updatedUser });
        }
        catch (error) {
            res.status(400).json({ message: error });
        }
    }
};
exports.UserManagementController = UserManagementController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "getUsers", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "getUserDetails", null);
__decorate([
    (0, inversify_express_utils_1.httpPatch)("/:id/suspension"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "suspendUser", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "deleteUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserManagementController.prototype, "updateUser", null);
exports.UserManagementController = UserManagementController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/admin/users"),
    __param(0, (0, inversify_1.inject)(userManagement_types_1.USER_MANAGEMENT_TYPES.UserManagementService)),
    __metadata("design:paramtypes", [userManagement_service_1.UserManagementService])
], UserManagementController);
