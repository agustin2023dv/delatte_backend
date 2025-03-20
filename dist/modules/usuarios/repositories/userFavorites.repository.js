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
exports.UserFavoritesRepository = void 0;
const inversify_1 = require("inversify");
const mongoose_1 = require("mongoose");
const User_model_1 = __importDefault(require("../models/User.model"));
let UserFavoritesRepository = class UserFavoritesRepository {
    async getUserFavorites(userId) {
        const user = await User_model_1.default.findById(userId).select("favoriteRestaurants").lean();
        if (!user)
            throw new Error("Usuario no encontrado");
        return user.favoriteRestaurants;
    }
    async addFavoriteRestaurant(userId, restaurantId) {
        if (!mongoose_1.Types.ObjectId.isValid(restaurantId)) {
            throw new Error("ID de restaurante no válido");
        }
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new Error("Usuario no encontrado");
        if (!user.favoriteRestaurants)
            user.favoriteRestaurants = [];
        const restaurantObjectId = new mongoose_1.Types.ObjectId(restaurantId);
        if (!user.favoriteRestaurants.some((id) => id.equals(restaurantObjectId))) {
            user.favoriteRestaurants.push(restaurantObjectId);
            await user.save();
        }
        return user.favoriteRestaurants;
    }
    async removeFavoriteRestaurant(userId, restaurantId) {
        if (!mongoose_1.Types.ObjectId.isValid(restaurantId)) {
            throw new Error("ID de restaurante no válido");
        }
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new Error("Usuario no encontrado");
        if (!user.favoriteRestaurants)
            user.favoriteRestaurants = [];
        const restaurantObjectId = new mongoose_1.Types.ObjectId(restaurantId);
        user.favoriteRestaurants = user.favoriteRestaurants.filter((id) => !id.equals(restaurantObjectId));
        await user.save();
        return user.favoriteRestaurants;
    }
};
exports.UserFavoritesRepository = UserFavoritesRepository;
exports.UserFavoritesRepository = UserFavoritesRepository = __decorate([
    (0, inversify_1.injectable)()
], UserFavoritesRepository);
