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
exports.UserFavoritesService = void 0;
const inversify_1 = require("inversify");
const userFavorites_types_1 = require("../types/userFavorites.types");
const userFavorites_repository_1 = require("../repositories/userFavorites.repository");
let UserFavoritesService = class UserFavoritesService {
    userFavoritesRepository;
    constructor(userFavoritesRepository) {
        this.userFavoritesRepository = userFavoritesRepository;
    }
    async getUserFavorites(userId) {
        return await this.userFavoritesRepository.getUserFavorites(userId);
    }
    async addFavoriteRestaurant(userId, restaurantId) {
        try {
            const favorites = await this.userFavoritesRepository.addFavoriteRestaurant(userId, restaurantId);
            return { message: "Restaurante agregado a favoritos", favorites };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Error desconocido");
        }
    }
    async removeFavoriteRestaurant(userId, restaurantId) {
        try {
            const favorites = await this.userFavoritesRepository.removeFavoriteRestaurant(userId, restaurantId);
            return { message: "Restaurante eliminado de favoritos", favorites };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : "Error desconocido");
        }
    }
};
exports.UserFavoritesService = UserFavoritesService;
exports.UserFavoritesService = UserFavoritesService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(userFavorites_types_1.USER_FAVORITES_TYPES.UserFavoritesRepository)),
    __metadata("design:paramtypes", [userFavorites_repository_1.UserFavoritesRepository])
], UserFavoritesService);
;
