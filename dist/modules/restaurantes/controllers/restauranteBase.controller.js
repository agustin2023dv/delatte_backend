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
exports.RestaurantBaseController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const restaurantBase_types_1 = require("../types/restaurantBase.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const restaurant_middleware_1 = require("../../../middlewares/restaurant.middleware");
const restaurantRegistration_service_1 = require("../services/restaurantRegistration.service");
let RestaurantBaseController = class RestaurantBaseController {
    restaurantService;
    restaurantRegistrationService;
    constructor(restaurantService, restaurantRegistrationService) {
        this.restaurantService = restaurantService;
        this.restaurantRegistrationService = restaurantRegistrationService;
    }
    async getAllRestaurants(req, res) {
        try {
            const restaurants = await this.restaurantService.getAllRestaurants();
            res.status(200).json(restaurants);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener restaurantes", error });
        }
    }
    async getRestaurantById(req, res) {
        try {
            const restaurant = await this.restaurantService.getRestaurantById(req.params.id);
            if (!restaurant) {
                res.status(404).json({ message: "Restaurante no encontrado" });
                return;
            }
            res.status(200).json(restaurant);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener el restaurante", error });
        }
    }
    async getRestaurantsByManagerId(req, res) {
        try {
            const restaurants = await this.restaurantService.getRestaurantsByManagerId(req.params.id);
            res.status(200).json(restaurants);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los restaurantes", error });
        }
    }
    async registerRestaurantAndManager(req, res) {
        try {
            const { restaurant: restaurantData, manager: managerData } = req.body;
            const result = await this.restaurantRegistrationService.registerRestaurantAndManager(restaurantData, managerData);
            res.status(201).json(result);
        }
        catch (error) {
            console.error("Error en el controlador:", error);
            res.status(500).json({ message: "Error al registrar el restaurante y manager", error });
        }
    }
    async updateRestaurant(req, res) {
        try {
            const updatedRestaurant = await this.restaurantService.updateRestaurant(req.params.id, req.body);
            if (!updatedRestaurant) {
                res.status(404).json({ message: "Restaurante no encontrado" });
                return;
            }
            res.status(200).json(updatedRestaurant);
        }
        catch (error) {
            res.status(500).json({ message: "Error al actualizar el restaurante", error });
        }
    }
};
exports.RestaurantBaseController = RestaurantBaseController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantBaseController.prototype, "getAllRestaurants", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantBaseController.prototype, "getRestaurantById", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/managers/:id/restaurants"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantBaseController.prototype, "getRestaurantsByManagerId", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantBaseController.prototype, "registerRestaurantAndManager", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantBaseController.prototype, "updateRestaurant", null);
exports.RestaurantBaseController = RestaurantBaseController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/restaurants"),
    __param(0, (0, inversify_1.inject)(restaurantBase_types_1.RESTAURANT_BASE_TYPES.IRestaurantService)),
    __param(1, (0, inversify_1.inject)(restaurantBase_types_1.RESTAURANT_BASE_TYPES.IRestaurantRegisterService)),
    __metadata("design:paramtypes", [Object, restaurantRegistration_service_1.RestaurantRegistrationService])
], RestaurantBaseController);
