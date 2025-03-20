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
exports.RestaurantAnalyticsController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const restaurantStats_types_1 = require("../types/restaurantStats.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
let RestaurantAnalyticsController = class RestaurantAnalyticsController {
    restaurantStatsService;
    constructor(restaurantStatsService) {
        this.restaurantStatsService = restaurantStatsService;
    }
    /**
     * @swagger
     * /api/v1/restaurants/analytics/top:
     *   get:
     *     summary: Obtener los restaurantes con más reservas y mejores calificaciones
     *     description: Devuelve una lista de los restaurantes mejor calificados y con más reservas en la plataforma.
     *     tags:
     *       - Restaurant Analytics
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de los mejores restaurantes obtenida correctamente.
     *       401:
     *         description: Usuario no autenticado.
     *       403:
     *         description: No autorizado para acceder a esta información.
     */
    async getTopRestaurants(req, res) {
        try {
            const data = await this.restaurantStatsService.getTopRestaurants();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los mejores restaurantes", error });
        }
    }
    /**
     * @swagger
     * /api/v1/restaurants/analytics/worst-performing:
     *   get:
     *     summary: Obtener los restaurantes con menos reservas y peores calificaciones
     *     description: Devuelve una lista de los restaurantes con menor desempeño en términos de reservas y calificaciones.
     *     tags:
     *       - Restaurant Analytics
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de los restaurantes con menor desempeño obtenida correctamente.
     *       401:
     *         description: Usuario no autenticado.
     *       403:
     *         description: No autorizado para acceder a esta información.
     */
    async getWorstPerformingRestaurants(req, res) {
        try {
            const data = await this.restaurantStatsService.getWorstPerformingRestaurants();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los restaurantes con peor desempeño", error });
        }
    }
    /**
     * @swagger
     * /api/v1/restaurants/analytics/new:
     *   get:
     *     summary: Obtener los restaurantes recién agregados
     *     description: Devuelve una lista de los restaurantes que se han registrado recientemente en la plataforma.
     *     tags:
     *       - Restaurant Analytics
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de los restaurantes nuevos obtenida correctamente.
     *       401:
     *         description: Usuario no autenticado.
     *       403:
     *         description: No autorizado para acceder a esta información.
     */
    async getNewRestaurants(req, res) {
        try {
            const data = await this.restaurantStatsService.getNewRestaurants();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los restaurantes nuevos", error });
        }
    }
    /**
     * @swagger
     * /api/v1/restaurants/analytics/saturation:
     *   get:
     *     summary: Obtener restaurantes con alta ocupación y baja disponibilidad
     *     description: Devuelve una lista de los restaurantes con alta demanda y disponibilidad limitada.
     *     tags:
     *       - Restaurant Analytics
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Lista de los restaurantes saturados obtenida correctamente.
     *       401:
     *         description: Usuario no autenticado.
     *       403:
     *         description: No autorizado para acceder a esta información.
     */
    async getSaturatedRestaurants(req, res) {
        try {
            const data = await this.restaurantStatsService.getSaturatedRestaurants();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener restaurantes saturados", error });
        }
    }
};
exports.RestaurantAnalyticsController = RestaurantAnalyticsController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/top", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin", "manager"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantAnalyticsController.prototype, "getTopRestaurants", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/worst-performing", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin", "manager"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantAnalyticsController.prototype, "getWorstPerformingRestaurants", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/new", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin", "manager"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantAnalyticsController.prototype, "getNewRestaurants", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/saturation", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin", "manager"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantAnalyticsController.prototype, "getSaturatedRestaurants", null);
exports.RestaurantAnalyticsController = RestaurantAnalyticsController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/restaurants/analytics"),
    __param(0, (0, inversify_1.inject)(restaurantStats_types_1.RESTAURANT_STATS_TYPES.IRestaurantStatsService)),
    __metadata("design:paramtypes", [Object])
], RestaurantAnalyticsController);
