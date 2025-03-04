"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeFavoriteRestaurantController = exports.addFavoriteRestaurantController = exports.getUserFavoritesController = void 0;
const favorite_service_1 = require("../services/favorite.service");
// **Controlador para obtener favoritos del usuario**
const getUserFavoritesController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const userId = req.user.id;
        const favorites = await (0, favorite_service_1.getUserFavoritesService)(userId);
        res.status(200).json({ favorites });
    }
    catch (error) {
        console.error("Error al obtener favoritos:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
        });
    }
};
exports.getUserFavoritesController = getUserFavoritesController;
// **Controlador para agregar un restaurante a favoritos**
const addFavoriteRestaurantController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const userId = req.user.id;
        const { restaurantId } = req.body;
        if (!restaurantId) {
            res.status(400).json({ message: "El ID del restaurante es obligatorio" });
            return;
        }
        const user = await (0, favorite_service_1.addFavoriteRestaurantService)(userId, restaurantId);
        res.status(200).json({
            message: "Restaurante agregado a favoritos con éxito",
            favorites: user.favorites,
        });
    }
    catch (error) {
        console.error("Error en addFavoriteRestaurantController:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
        });
    }
};
exports.addFavoriteRestaurantController = addFavoriteRestaurantController;
// **Controlador para eliminar un restaurante de favoritos**
const removeFavoriteRestaurantController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const userId = req.user.id;
        const { restaurantId } = req.body;
        if (!restaurantId) {
            res.status(400).json({ message: "El ID del restaurante es obligatorio" });
            return;
        }
        const user = await (0, favorite_service_1.removeFavoriteRestaurantService)(userId, restaurantId);
        res.status(200).json({
            message: "Restaurante eliminado de favoritos con éxito",
            favorites: user.favorites,
        });
    }
    catch (error) {
        console.error("Error en removeFavoriteRestaurantController:", error);
        res.status(500).json({
            message: error instanceof Error ? error.message : "Error interno del servidor",
        });
    }
};
exports.removeFavoriteRestaurantController = removeFavoriteRestaurantController;
