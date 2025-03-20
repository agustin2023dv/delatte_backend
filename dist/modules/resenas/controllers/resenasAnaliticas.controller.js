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
exports.ReviewAnalyticsController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const reviewAnalytics_types_1 = require("../types/reviewAnalytics.types");
let ReviewAnalyticsController = class ReviewAnalyticsController extends inversify_express_utils_1.BaseHttpController {
    reviewAnalyticsService;
    constructor(reviewAnalyticsService) {
        super();
        this.reviewAnalyticsService = reviewAnalyticsService;
    }
    /**
     * @swagger
     * /api/v1/reviews/analytics/stats/sentiment:
     *   get:
     *     summary: Obtener estadísticas de sentimiento en reviews
     *     description: Retorna un análisis de sentimiento de las reseñas de la plataforma.
     *     tags:
     *       - Review Analytics
     *     responses:
     *       200:
     *         description: Estadísticas obtenidas con éxito.
     *       500:
     *         description: Error al obtener estadísticas de sentimiento.
     */
    async getReviewSentimentStats(req, res) {
        try {
            const data = await this.reviewAnalyticsService.getReviewSentimentStats();
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener estadísticas de sentimiento", error });
        }
    }
    /**
     * @swagger
     * /api/v1/reviews/analytics/stats/average:
     *   get:
     *     summary: Obtener promedio de calificaciones en reseñas
     *     description: Devuelve el promedio de calificaciones, agrupado por el parámetro especificado.
     *     tags:
     *       - Review Analytics
     *     parameters:
     *       - in: query
     *         name: groupBy
     *         schema:
     *           type: string
     *         description: Parámetro por el cual agrupar las calificaciones (por ejemplo, "restaurant").
     *     responses:
     *       200:
     *         description: Promedio de calificaciones obtenido con éxito.
     *       500:
     *         description: Error al obtener el promedio de calificaciones.
     */
    async getAverageReview(req, res) {
        try {
            const groupBy = req.query.groupBy;
            const data = await this.reviewAnalyticsService.getAverageReview(groupBy);
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el promedio de calificaciones", error });
        }
    }
    /**
     * @swagger
     * /api/v1/reviews/analytics/reviews/reported:
     *   get:
     *     summary: Obtener reseñas reportadas
     *     description: Devuelve un listado de las reseñas reportadas como ofensivas o falsas.
     *     tags:
     *       - Review Analytics
     *     responses:
     *       200:
     *         description: Lista de reseñas reportadas obtenida con éxito.
     *       500:
     *         description: Error al obtener reseñas reportadas.
     */
    async getReportedReviews(req, res) {
        try {
            const data = await this.reviewAnalyticsService.getReportedReviews();
            res.json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener reviews reportadas", error });
        }
    }
};
exports.ReviewAnalyticsController = ReviewAnalyticsController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/stats/sentiment"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewAnalyticsController.prototype, "getReviewSentimentStats", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/stats/average"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewAnalyticsController.prototype, "getAverageReview", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/reviews/reported"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReviewAnalyticsController.prototype, "getReportedReviews", null);
exports.ReviewAnalyticsController = ReviewAnalyticsController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/reviews/analytics"),
    __param(0, (0, inversify_1.inject)(reviewAnalytics_types_1.REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsService)),
    __metadata("design:paramtypes", [Object])
], ReviewAnalyticsController);
