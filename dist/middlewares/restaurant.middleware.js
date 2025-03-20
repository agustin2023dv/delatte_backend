"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSearchParams = exports.managerOfRestaurantMiddleware = void 0;
const Restaurant_model_1 = __importDefault(require("../modules/restaurantes/models/Restaurant.model"));
/* Middleware para verificar si el usuario es el manager del restaurante*/
const managerOfRestaurantMiddleware = async (req, res, next) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const restaurant = await Restaurant_model_1.default.findById(req.params.id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurante no encontrado" });
            return;
        }
        const userId = req.user._id.toString();
        const isManagerPrincipal = restaurant.management.managerPrincipal?.toString() === userId;
        const isCoManager = restaurant.management.coManagers?.some((coManagerId) => coManagerId.toString() === userId);
        if (!isManagerPrincipal && !isCoManager && req.user.role !== "superadmin") {
            res.status(403).json({ message: "No tienes permiso para realizar esta acción" });
            return;
        }
        next(); // El usuario es un manager principal, coManager o superadmin, continuar
    }
    catch (error) {
        console.error("Error en el middleware managerOfRestaurant:", error);
        res.status(500).json({ message: "Error al verificar el manager del restaurante", error });
    }
};
exports.managerOfRestaurantMiddleware = managerOfRestaurantMiddleware;
//*
const validateSearchParams = (req, res, next) => {
    const { ubicacion, tipoComida } = req.query;
    if (!ubicacion && !tipoComida) {
        return res.status(400).json({ message: 'Debe proporcionar al menos un parámetro de búsqueda (ubicacion o tipo de comida)' });
    }
    next();
};
exports.validateSearchParams = validateSearchParams;
