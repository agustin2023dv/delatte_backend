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
exports.ReviewBaseController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const reviewBase_types_1 = require("../types/reviewBase.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
let ReviewBaseController = class ReviewBaseController extends inversify_express_utils_1.BaseHttpController {
    reviewService;
    constructor(reviewService) {
        super();
        this.reviewService = reviewService;
    }
    // 📌 Obtener todas las reseñas (Solo para superadmins)
    async getAllReviews(req, res) {
        try {
            const { page, limit } = req.query;
            const reviews = await this.reviewService.getAllReviews(Number(page) || 1, Number(limit) || 10);
            res.status(200).json(reviews);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener todas las reseñas." });
        }
    }
    // 📌 Obtener reseñas de un restaurante específico
    async getReviewsByRestaurant(req, res) {
        try {
            const reviews = await this.reviewService.getReviewsByRestaurant(req.params.id);
            res.status(200).json(reviews);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener las reseñas del restaurante." });
        }
    }
    // 📌 Obtener reseñas de un usuario específico
    async getReviewsByUser(req, res) {
        try {
            const reviews = await this.reviewService.getReviewsByUser(req.params.id);
            res.status(200).json(reviews);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener las reseñas del usuario." });
        }
    }
    // 📌 Crear una nueva reseña (Solo usuarios "customer")
    async createReview(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado." });
                return;
            }
            const newReview = await this.reviewService.createReview(req.user._id, req.body);
            res.status(201).json({ message: "Reseña creada con éxito", review: newReview });
        }
        catch (error) {
            console.error("Error en createReview:", error);
            res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
        }
    }
    // 📌 Actualizar una reseña (Solo usuarios "customer")
    async updateReview(req, res) {
        try {
            const updatedReview = await this.reviewService.updateReview(req.params.id, req.body);
            if (!updatedReview) {
                res.status(404).json({ message: "Reseña no encontrada." });
                return;
            }
            res.status(200).json(updatedReview);
        }
        catch (error) {
            res.status(500).json({ message: "Error interno del servidor." });
        }
    }
    // 📌 Eliminar una reseña (Solo "customer" y "superadmin")
    async deleteReview(req, res) {
        try {
            await this.reviewService.deleteReview(req.params.id);
            res.status(204).send();
        }
        catch (error) {
            res.status(500).json({ message: "Error al eliminar la reseña." });
        }
    }
};
exports.ReviewBaseController = ReviewBaseController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewBaseController.prototype, "getAllReviews", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/restaurants/:id", auth_middleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewBaseController.prototype, "getReviewsByRestaurant", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/users/:id", auth_middleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewBaseController.prototype, "getReviewsByUser", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["customer"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewBaseController.prototype, "createReview", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["customer"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewBaseController.prototype, "updateReview", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["customer", "superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewBaseController.prototype, "deleteReview", null);
exports.ReviewBaseController = ReviewBaseController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/reviews"),
    __param(0, (0, inversify_1.inject)(reviewBase_types_1.REVIEWS_BASE_TYPES.IReviewBaseService)),
    __metadata("design:paramtypes", [Object])
], ReviewBaseController);
