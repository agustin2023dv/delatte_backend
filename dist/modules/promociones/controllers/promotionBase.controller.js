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
exports.PromotionBaseController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const promotionBase_types_1 = require("../types/promotionBase.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const restaurant_middleware_1 = require("../../../middlewares/restaurant.middleware");
let PromotionBaseController = class PromotionBaseController extends inversify_express_utils_1.BaseHttpController {
    promotionService;
    constructor(promotionService) {
        super();
        this.promotionService = promotionService;
    }
    async createPromotion(req, res) {
        try {
            const newPromotion = await this.promotionService.createPromotion(req.body);
            res.status(201).json(newPromotion);
        }
        catch (error) {
            res.status(500).json({ message: "Error al crear la promoción", error });
        }
    }
    async getPromotions(req, res) {
        try {
            const promotions = await this.promotionService.getPromotionsByRestaurant(req.params.id);
            res.status(200).json(promotions);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener promociones", error });
        }
    }
    async updatePromotion(req, res) {
        try {
            const updatedPromotion = await this.promotionService.updatePromotion(req.params.promoId, req.body);
            res.status(200).json(updatedPromotion);
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar la promoción", error });
        }
    }
    async deletePromotion(req, res) {
        try {
            await this.promotionService.deletePromotion(req.params.promoId);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la promoción", error });
        }
    }
};
exports.PromotionBaseController = PromotionBaseController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/:id", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionBaseController.prototype, "createPromotion", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionBaseController.prototype, "getPromotions", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id/promotions/:promoId", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionBaseController.prototype, "updatePromotion", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id/promotions/:promoId", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionBaseController.prototype, "deletePromotion", null);
exports.PromotionBaseController = PromotionBaseController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/promotions"),
    __param(0, (0, inversify_1.inject)(promotionBase_types_1.PROMOTIONS_BASE_TYPES.IPromotionBaseService)),
    __metadata("design:paramtypes", [Object])
], PromotionBaseController);
