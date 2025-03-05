"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantByNameService = exports.getPlacesNearbyService = void 0;
const Restaurant_model_1 = __importDefault(require("../../restaurantes/models/Restaurant.model"));
// Obtener lugares cercanos usando coordenadas y un radio
const getPlacesNearbyService = async (lat, lng, radius) => {
    try {
        const nearbyRestaurants = await Restaurant_model_1.default.find({
            ubicacion: {
                $near: {
                    $geometry: {
                        type: "Point",
                        coordinates: [lng, lat],
                    },
                    $maxDistance: radius,
                    $minDistance: 0
                },
            },
        });
        console.log(nearbyRestaurants.length);
        return nearbyRestaurants;
    }
    catch (error) {
        console.error("Error al buscar lugares cercanos en MongoDB:", error);
        throw new Error("No se pudo obtener la lista de restaurantes cercanos.");
    }
};
exports.getPlacesNearbyService = getPlacesNearbyService;
const getRestaurantByNameService = async (query) => {
    return Restaurant_model_1.default.find({ nombre: { $regex: query, $options: 'i' } })
        .catch(error => {
        console.error('Error en la búsqueda:', error);
        throw error;
    });
};
exports.getRestaurantByNameService = getRestaurantByNameService;
