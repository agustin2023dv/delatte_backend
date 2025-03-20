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
exports.MenuBaseController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const menuBase_types_1 = require("../types/menuBase.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const restaurant_middleware_1 = require("../../../middlewares/restaurant.middleware");
let MenuBaseController = class MenuBaseController extends inversify_express_utils_1.BaseHttpController {
    menuBaseService;
    constructor(menuBaseService) {
        super();
        this.menuBaseService = menuBaseService;
    }
    async getMenusByRestaurant(req, res) {
        try {
            const menus = await this.menuBaseService.getMenusByRestaurant(req.params.restaurantId);
            res.status(200).json(menus);
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(500).json({ message: "Error al obtener menús", error: errMessage });
        }
    }
    async createMenu(req, res) {
        try {
            const newMenu = await this.menuBaseService.createMenu(req.body);
            res.status(201).json(newMenu);
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(500).json({ message: "Error al crear menú", error: errMessage });
        }
    }
    async updateMenu(req, res) {
        try {
            const updatedMenu = await this.menuBaseService.updateMenu(req.params.menuId, req.body);
            res.status(200).json(updatedMenu);
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú no encontrado", error: errMessage });
        }
    }
    async deleteMenu(req, res) {
        try {
            await this.menuBaseService.deleteMenu(req.params.menuId);
            res.status(204).send();
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú no encontrado", error: errMessage });
        }
    }
};
exports.MenuBaseController = MenuBaseController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/restaurant/:restaurantId"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuBaseController.prototype, "getMenusByRestaurant", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuBaseController.prototype, "createMenu", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:menuId", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuBaseController.prototype, "updateMenu", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:menuId", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuBaseController.prototype, "deleteMenu", null);
exports.MenuBaseController = MenuBaseController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/menus"),
    __param(0, (0, inversify_1.inject)(menuBase_types_1.MENUS_BASE_TYPES.IMenuBaseService)),
    __metadata("design:paramtypes", [Object])
], MenuBaseController);
