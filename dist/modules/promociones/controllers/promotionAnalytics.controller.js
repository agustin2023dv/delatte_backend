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
exports.PromotionAnalyticsController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const promotionAnalytics_types_1 = require("../types/promotionAnalytics.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
let PromotionAnalyticsController = class PromotionAnalyticsController extends inversify_express_utils_1.BaseHttpController {
    promotionAnalyticsService;
    constructor(promotionAnalyticsService) {
        super();
        this.promotionAnalyticsService = promotionAnalyticsService;
    }
    async getPromotionCount(req, res) {
        try {
            const stats = await this.promotionAnalyticsService.getPromotionCount();
            if (!stats || stats.length === 0) {
                res.status(404).json({ message: "No se encontraron estadísticas de promociones" });
                return;
            }
            res.json(stats);
        }
        catch (error) {
            console.error("Error al obtener cantidad de promociones:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
    async getTopRestaurantsByPromotions(req, res) {
        try {
            const topRestaurants = await this.promotionAnalyticsService.getTopRestaurantsByPromotions();
            if (!topRestaurants || topRestaurants.length === 0) {
                res.status(404).json({ message: "No se encontraron restaurantes con promociones" });
                return;
            }
            res.json(topRestaurants);
        }
        catch (error) {
            console.error("Error al obtener restaurantes con más promociones:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
    async getPromotionImpact(req, res) {
        try {
            const impact = await this.promotionAnalyticsService.getPromotionImpact();
            if (!impact || impact.length === 0) {
                res.status(404).json({ message: "No se encontró impacto de promociones" });
                return;
            }
            res.json(impact);
        }
        catch (error) {
            console.error("Error al obtener impacto de promociones:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
    async getIneffectivePromotions(req, res) {
        try {
            const ineffectivePromos = await this.promotionAnalyticsService.getIneffectivePromotions();
            if (!ineffectivePromos || ineffectivePromos.length === 0) {
                res.status(404).json({ message: "No se encontraron promociones inefectivas" });
                return;
            }
            res.json(ineffectivePromos);
        }
        catch (error) {
            console.error("Error al obtener promociones inefectivas:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
};
exports.PromotionAnalyticsController = PromotionAnalyticsController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/count", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionAnalyticsController.prototype, "getPromotionCount", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/top-restaurants", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionAnalyticsController.prototype, "getTopRestaurantsByPromotions", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/impact", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionAnalyticsController.prototype, "getPromotionImpact", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/ineffective", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], PromotionAnalyticsController.prototype, "getIneffectivePromotions", null);
exports.PromotionAnalyticsController = PromotionAnalyticsController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/promotions/analytics"),
    __param(0, (0, inversify_1.inject)(promotionAnalytics_types_1.PROMOTIONS_ANALYTICS_TYPES.IPromotionAnalyticsService)),
    __metadata("design:paramtypes", [Object])
], PromotionAnalyticsController);
