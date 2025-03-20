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
exports.RestaurantAnalyticsService = void 0;
const inversify_1 = require("inversify");
const restaurantStats_types_1 = require("../types/restaurantStats.types");
let RestaurantAnalyticsService = class RestaurantAnalyticsService {
    restaurantStatsRepo;
    constructor(restaurantStatsRepo) {
        this.restaurantStatsRepo = restaurantStatsRepo;
    }
    async getTopRestaurants() {
        return await this.restaurantStatsRepo.getTopRestaurants();
    }
    async getWorstPerformingRestaurants() {
        return await this.restaurantStatsRepo.getWorstPerformingRestaurants();
    }
    async getNewRestaurants() {
        return await this.restaurantStatsRepo.getNewRestaurants();
    }
    async getSaturatedRestaurants() {
        return await this.restaurantStatsRepo.getSaturatedRestaurants();
    }
};
exports.RestaurantAnalyticsService = RestaurantAnalyticsService;
exports.RestaurantAnalyticsService = RestaurantAnalyticsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(restaurantStats_types_1.RESTAURANT_STATS_TYPES.IRestaurantStatsRepository)),
    __metadata("design:paramtypes", [Object])
], RestaurantAnalyticsService);
