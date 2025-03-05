"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteRestaurantService = exports.addFavoriteRestaurantService = exports.getUserFavoritesService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const User_model_1 = __importDefault(require("../models/User.model"));
const getUserFavoritesService = async (userId) => {
    const user = await User_model_1.default.findById(userId).populate("favoriteRestaurants");
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    return user.favoriteRestaurants; // Devuelve la lista de favoritos
};
exports.getUserFavoritesService = getUserFavoritesService;
const addFavoriteRestaurantService = async (userId, restaurantId) => {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(restaurantId)) {
            throw new Error('ID de restaurante no válido');
        }
        const user = await User_model_1.default.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Asegurar que `favoriteRestaurants` no es undefined
        if (!user.favoriteRestaurants) {
            user.favoriteRestaurants = [];
        }
        if (!user.favoriteRestaurants.includes(restaurantId)) {
            user.favoriteRestaurants.push(restaurantId);
            await user.save();
        }
        return { message: "Restaurante agregado a favoritos", favorites: user.favoriteRestaurants };
    }
    catch (error) {
        console.error("Error en addFavoriteRestaurantService:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Error desconocido");
    }
};
exports.addFavoriteRestaurantService = addFavoriteRestaurantService;
const removeFavoriteRestaurantService = async (userId, restaurantId) => {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(restaurantId)) {
            throw new Error('ID de restaurante no válido');
        }
        const user = await User_model_1.default.findById(userId);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Asegurar que `favoriteRestaurants` no es undefined
        if (!user.favoriteRestaurants) {
            user.favoriteRestaurants = [];
        }
        if (user.favoriteRestaurants.includes(restaurantId)) {
            user.favoriteRestaurants = user.favoriteRestaurants.filter((id) => id.toString() !== restaurantId);
            await user.save();
        }
        return { message: "Restaurante eliminado de favoritos", favorites: user.favoriteRestaurants };
    }
    catch (error) {
        console.error("Error en removeFavoriteRestaurantService:", error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error("Error desconocido");
    }
};
exports.removeFavoriteRestaurantService = removeFavoriteRestaurantService;
