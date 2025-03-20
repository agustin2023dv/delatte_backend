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
exports.RestaurantPermissionsController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const restaurantPermissions_types_1 = require("../types/restaurantPermissions.types");
let RestaurantPermissionsController = class RestaurantPermissionsController {
    restaurantPermissionsService;
    constructor(restaurantPermissionsService) {
        this.restaurantPermissionsService = restaurantPermissionsService;
    }
    async isManager(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const { restaurantId } = req.params;
            const userId = req.user.id;
            const isManager = await this.restaurantPermissionsService.checkUserRoleInRestaurant(restaurantId, userId);
            res.status(200).json({ isManager });
        }
        catch (error) {
            console.error("Error verificando rol:", error);
            if (error instanceof Error) {
                if (error.message === "Restaurante no encontrado") {
                    res.status(404).json({ message: error.message });
                    return;
                }
                res.status(500).json({ message: error.message });
                return;
            }
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
};
exports.RestaurantPermissionsController = RestaurantPermissionsController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/is-manager/:restaurantId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantPermissionsController.prototype, "isManager", null);
exports.RestaurantPermissionsController = RestaurantPermissionsController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/permissions"),
    __param(0, (0, inversify_1.inject)(restaurantPermissions_types_1.RESTAURANT_PERMISSIONS_TYPES.IRestaurantPermissionsService)),
    __metadata("design:paramtypes", [Object])
], RestaurantPermissionsController);
