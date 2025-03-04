"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserRoleInRestaurantService = exports.removePhotoFromGalleryService = exports.addPhotoToGalleryService = exports.getGalleryPhotosService = exports.getRestaurantsByManagerIdService = exports.getRestaurantDetailsService = exports.registerRestaurantService = exports.updateRestaurantService = exports.getAllRestaurantsService = exports.getRestauranteIdByManagerService = void 0;
const distance_matrix_service_1 = require("./distance-matrix.service");
const Restaurant_model_1 = __importDefault(require("../models/Restaurant.model"));
//* Servicio para obtener el restaurante del manager
const getRestauranteIdByManagerService = async (managerId) => {
    try {
        const restaurante = await Restaurant_model_1.default.findOne({ managers: managerId });
        return restaurante?._id;
    }
    catch (error) {
        throw new Error('Error al obtener el restaurante del manager');
    }
};
exports.getRestauranteIdByManagerService = getRestauranteIdByManagerService;
//* Servicio para obtener TODOS los restaurantes
const getAllRestaurantsService = async () => {
    try {
        const restaurantes = await Restaurant_model_1.default.find().lean();
        return restaurantes;
    }
    catch (error) {
        console.error("Error al obtener restaurantes:", error);
        throw new Error("Error al obtener restaurantes");
    }
};
exports.getAllRestaurantsService = getAllRestaurantsService;
//** Servicio para actualizar un restaurante por ID
const updateRestaurantService = async (id, newRestaurantData) => {
    try {
        return await Restaurant_model_1.default.findByIdAndUpdate(id, newRestaurantData, { new: true });
    }
    catch (error) {
        throw new Error('Error al actualizar el restaurante');
    }
};
exports.updateRestaurantService = updateRestaurantService;
//** Servicio para crear restaurante
const registerRestaurantService = async (restaurantData) => {
    try {
        const direccionCompleta = `${restaurantData.direccion}, Montevideo, ${restaurantData.codigoPostal || ''}, Uruguay`;
        console.log("Dirección completa:", direccionCompleta);
        let latitude;
        let longitude;
        // Obtener coordenadas a partir de la dirección
        try {
            const coordenadas = await (0, distance_matrix_service_1.getCoordinatesFromAddress)(direccionCompleta);
            console.log("Coordenadas obtenidas:", coordenadas);
            if (coordenadas) {
                latitude = coordenadas.latitude;
                longitude = coordenadas.longitude;
            }
            else {
                throw new Error("No se encontraron coordenadas para la dirección proporcionada.");
            }
        }
        catch (error) {
            console.error('Error al obtener coordenadas:', error);
            throw new Error('Error al obtener coordenadas para el restaurante.');
        }
        // Crear el restaurante con el manager principal asignado y ubicacion en formato GeoJSON
        const newRestaurant = new Restaurant_model_1.default({
            ...restaurantData,
            ubicacion: {
                type: "Point",
                coordinates: [longitude, latitude], // [longitud, latitud] formato GeoJSON
            },
        });
        const savedRestaurant = await newRestaurant.save();
        console.log('Restaurante guardado:', savedRestaurant);
        return savedRestaurant;
    }
    catch (error) {
        console.error('Error al guardar el restaurante:', error);
        throw error;
    }
};
exports.registerRestaurantService = registerRestaurantService;
// ** Servicio para obtener todos los detalles de un restaurante por ID
const getRestaurantDetailsService = async (restaurantId) => {
    try {
        const restaurant = await Restaurant_model_1.default.findById(restaurantId);
        if (!restaurant) {
            throw new Error('Restaurante no encontrado');
        }
        return restaurant;
    }
    catch (error) {
        throw new Error('Error al obtener los detalles del restaurante');
    }
};
exports.getRestaurantDetailsService = getRestaurantDetailsService;
//*
const getRestaurantsByManagerIdService = async (id) => {
    try {
        const restaurants = await Restaurant_model_1.default.find({
            managerPrincipal: id
        });
        return restaurants;
    }
    catch (error) {
        throw new Error('Error al obtener los restaurantes del manager');
    }
};
exports.getRestaurantsByManagerIdService = getRestaurantsByManagerIdService;
// Obtener las fotos de la galería de un restaurante
const getGalleryPhotosService = async (restaurantId) => {
    try {
        const restaurant = await Restaurant_model_1.default.findById(restaurantId).select("galeriaFotos");
        if (!restaurant) {
            throw new Error("Restaurante no encontrado");
        }
        return restaurant.galeriaFotos;
    }
    catch (error) {
        throw new Error("Error al obtener las fotos de la galería");
    }
};
exports.getGalleryPhotosService = getGalleryPhotosService;
// Agregar una foto a la galería de un restaurante
const addPhotoToGalleryService = async (restaurantId, photoUrl) => {
    try {
        const restaurant = await Restaurant_model_1.default.findByIdAndUpdate(restaurantId, { $push: { galeriaFotos: photoUrl } }, { new: true });
        if (!restaurant) {
            throw new Error("Restaurante no encontrado");
        }
        return restaurant.galeriaFotos;
    }
    catch (error) {
        throw new Error("Error al agregar la foto a la galería");
    }
};
exports.addPhotoToGalleryService = addPhotoToGalleryService;
// Eliminar una foto de la galería de un restaurante
const removePhotoFromGalleryService = async (restaurantId, photoUrl) => {
    try {
        const restaurant = await Restaurant_model_1.default.findByIdAndUpdate(restaurantId, { $pull: { galeriaFotos: photoUrl } }, { new: true });
        if (!restaurant) {
            throw new Error("Restaurante no encontrado");
        }
        return restaurant.galeriaFotos;
    }
    catch (error) {
        throw new Error("Error al eliminar la foto de la galería");
    }
};
exports.removePhotoFromGalleryService = removePhotoFromGalleryService;
// Servicio para verificar si el usuario es manager o co-manager de un restaurante
const checkUserRoleInRestaurantService = async (restaurantId, userId) => {
    try {
        const restaurant = await Restaurant_model_1.default.findById(restaurantId);
        if (!restaurant) {
            throw new Error('Restaurante no encontrado');
        }
        // Verificar si el usuario es manager principal o co-manager
        return (restaurant.managerPrincipal?.toString() === userId ||
            restaurant.coManagers.some((manager) => manager.toString() === userId));
    }
    catch (error) {
        console.error('Error en el servicio checkUserRoleInRestaurant:', error);
        throw error;
    }
};
exports.checkUserRoleInRestaurantService = checkUserRoleInRestaurantService;
