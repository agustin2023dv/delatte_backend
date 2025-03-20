"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantPermissionsRepository = void 0;
const inversify_1 = require("inversify");
const Restaurant_model_1 = __importDefault(require("../models/Restaurant.model"));
let RestaurantPermissionsRepository = class RestaurantPermissionsRepository {
    async checkUserRoleInRestaurant(restaurantId, userId) {
        const restaurant = await Restaurant_model_1.default.findById(restaurantId);
        if (!restaurant)
            throw new Error("Restaurante no encontrado");
        return (restaurant.management.managerPrincipal?.toString() === userId ||
            restaurant.management.coManagers.some((manager) => manager.toString() === userId));
    }
};
exports.RestaurantPermissionsRepository = RestaurantPermissionsRepository;
exports.RestaurantPermissionsRepository = RestaurantPermissionsRepository = __decorate([
    (0, inversify_1.injectable)()
], RestaurantPermissionsRepository);
