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
exports.UserFavoritesController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const userFavorites_service_1 = require("../services/userFavorites.service");
const userFavorites_types_1 = require("../types/userFavorites.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
let UserFavoritesController = class UserFavoritesController {
    userFavoritesService;
    constructor(userFavoritesService) {
        this.userFavoritesService = userFavoritesService;
    }
    async getUserFavorites(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const favorites = await this.userFavoritesService.getUserFavorites(req.user.id);
            res.status(200).json({ favorites });
        }
        catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
        }
    }
    async addFavoriteRestaurant(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const { restaurantId } = req.body;
            if (!restaurantId) {
                res.status(400).json({ message: "El ID del restaurante es obligatorio" });
                return;
            }
            const response = await this.userFavoritesService.addFavoriteRestaurant(req.user.id, restaurantId);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
        }
    }
    async removeFavoriteRestaurant(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const { restaurantId } = req.body;
            if (!restaurantId) {
                res.status(400).json({ message: "El ID del restaurante es obligatorio" });
                return;
            }
            const response = await this.userFavoritesService.removeFavoriteRestaurant(req.user.id, restaurantId);
            res.status(200).json(response);
        }
        catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
        }
    }
};
exports.UserFavoritesController = UserFavoritesController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserFavoritesController.prototype, "getUserFavorites", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserFavoritesController.prototype, "addFavoriteRestaurant", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserFavoritesController.prototype, "removeFavoriteRestaurant", null);
exports.UserFavoritesController = UserFavoritesController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/favorites", auth_middleware_1.authMiddleware),
    __param(0, (0, inversify_1.inject)(userFavorites_types_1.USER_FAVORITES_TYPES.UserFavoritesService)),
    __metadata("design:paramtypes", [userFavorites_service_1.UserFavoritesService])
], UserFavoritesController);
