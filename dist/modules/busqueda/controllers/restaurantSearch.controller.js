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
exports.RestaurantSearchController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
require("reflect-metadata");
const restaurantSearch_types_1 = require("../types/restaurantSearch.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
let RestaurantSearchController = class RestaurantSearchController {
    restaurantSearchService;
    constructor(restaurantSearchService) {
        this.restaurantSearchService = restaurantSearchService;
    }
    async searchByName(req, res) {
        try {
            const query = req.query.q;
            const limit = parseInt(req.query.limit) || 10;
            if (!query) {
                res.status(400).json({ message: "Parámetro de búsqueda no válido" });
                return;
            }
            const results = await this.restaurantSearchService.searchByName(query, limit);
            res.status(200).json(results);
        }
        catch (error) {
            console.error("Error en la búsqueda:", error);
            res.status(500).json({ message: "Error en la búsqueda", error });
        }
    }
};
exports.RestaurantSearchController = RestaurantSearchController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/by-name", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin", "manager", "customer"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantSearchController.prototype, "searchByName", null);
exports.RestaurantSearchController = RestaurantSearchController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/search/restaurants"),
    __param(0, (0, inversify_1.inject)(restaurantSearch_types_1.SEARCH_RESTAURANT_TYPES.IRestaurantSearchService)),
    __metadata("design:paramtypes", [Object])
], RestaurantSearchController);
