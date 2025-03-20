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
exports.RestaurantLocationController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const location_middleware_1 = require("../../../middlewares/location.middleware");
const restaurantLocation_types_1 = require("../types/restaurantLocation.types");
let RestaurantLocationController = class RestaurantLocationController {
    restaurantLocationService;
    constructor(restaurantLocationService) {
        this.restaurantLocationService = restaurantLocationService;
    }
    async getNearbyRestaurants(req, res) {
        try {
            const { lat, lng, radius } = req.query;
            const latitude = parseFloat(lat);
            const longitude = parseFloat(lng);
            const searchRadius = parseInt(radius);
            const nearbyRestaurants = await this.restaurantLocationService.getNearbyRestaurants(latitude, longitude, searchRadius);
            res.status(200).json(nearbyRestaurants.length ? nearbyRestaurants : { message: "No se encontraron restaurantes cercanos." });
        }
        catch (error) {
            console.error("Error al buscar restaurantes cercanos:", error);
            res.status(500).json({ message: "Error al buscar restaurantes cercanos", error });
        }
    }
};
exports.RestaurantLocationController = RestaurantLocationController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/nearby", auth_middleware_1.authMiddleware, location_middleware_1.validateLocationParams),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantLocationController.prototype, "getNearbyRestaurants", null);
exports.RestaurantLocationController = RestaurantLocationController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/restaurants"),
    __param(0, (0, inversify_1.inject)(restaurantLocation_types_1.RESTAURANT_LOCATION_TYPES.IRestaurantLocationService)),
    __metadata("design:paramtypes", [Object])
], RestaurantLocationController);
