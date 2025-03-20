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
exports.MenuItemController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const menuItem_types_1 = require("../types/menuItem.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const restaurant_middleware_1 = require("../../../middlewares/restaurant.middleware");
let MenuItemController = class MenuItemController extends inversify_express_utils_1.BaseHttpController {
    menuItemService;
    constructor(menuItemService) {
        super();
        this.menuItemService = menuItemService;
    }
    async addMenuItem(req, res) {
        try {
            const updatedMenu = await this.menuItemService.addMenuItem(req.params.menuId, req.body);
            res.status(200).json(updatedMenu);
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú no encontrado", error: errMessage });
        }
    }
    async removeMenuItem(req, res) {
        try {
            const updatedMenu = await this.menuItemService.removeMenuItem(req.params.menuId, req.params.itemId);
            res.status(200).json(updatedMenu);
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú o ítem no encontrado", error: errMessage });
        }
    }
    async updateMenuItem(req, res) {
        try {
            const updatedMenu = await this.menuItemService.updateMenuItem(req.params.menuId, req.params.itemId, req.body);
            res.status(200).json(updatedMenu);
        }
        catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú o ítem no encontrado", error: errMessage });
        }
    }
};
exports.MenuItemController = MenuItemController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/:menuId/items", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "addMenuItem", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:menuId/items/:itemId", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "removeMenuItem", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:menuId/items/:itemId", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], MenuItemController.prototype, "updateMenuItem", null);
exports.MenuItemController = MenuItemController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/menus"),
    __param(0, (0, inversify_1.inject)(menuItem_types_1.MENUS_ITEM_TYPES.IMenuItemService)),
    __metadata("design:paramtypes", [Object])
], MenuItemController);
