"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNearbyRestaurantsController = exports.removePhotoFromGalleryController = exports.addPhotoToGalleryController = exports.getGalleryPhotosController = exports.getSearchResultsController = exports.checkManagerRoleController = exports.getRestaurantsByManagerIdController = exports.updateRestaurantController = exports.getRestaurantByIdController = exports.getAllRestaurantsController = exports.registerRestaurantAndManagerController = void 0;
const restaurant_service_1 = require("../services/restaurant.service");
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const search_service_1 = require("../services/search.service");
//* Controlador para crear un nuevo restaurante y manager
const registerRestaurantAndManagerController = async (req, res) => {
    try {
        console.log("Datos recibidos en el controlador:", req.body);
        const { restaurant: restaurantData, manager: managerData } = req.body;
        // Hashear la contraseña del usuario
        const hashedPassword = await (0, auth_service_1.hashPasswordService)(managerData.password);
        managerData.password = hashedPassword;
        console.log("Restaurant details: ", restaurantData);
        console.log("Manager: ", managerData);
        // Guardar el manager
        const savedManager = await (0, user_service_1.registerManagerService)(managerData);
        // Asociar el manager principal al restaurante
        restaurantData.managerPrincipal = savedManager._id;
        // Guardar el restaurante
        const savedRestaurant = await (0, restaurant_service_1.registerRestaurantService)(restaurantData);
        res.status(201).json({ savedRestaurant, savedManager });
    }
    catch (error) {
        console.error("Error en el controlador:", error);
        res.status(500).json({
            message: "Error al registrar el restaurante y manager",
            error: error instanceof Error ? error.message : "Error desconocido",
        });
    }
};
exports.registerRestaurantAndManagerController = registerRestaurantAndManagerController;
//* Controlador para obtener TODOS los restaurantes
const getAllRestaurantsController = async (req, res) => {
    try {
        const restaurants = await (0, restaurant_service_1.getAllRestaurantsService)();
        if (!restaurants || restaurants.length === 0) {
            res.status(404).json({ message: "No se encontraron restaurantes" });
            return;
        }
        res.status(200).json(restaurants);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener restaurantes", error });
    }
};
exports.getAllRestaurantsController = getAllRestaurantsController;
//* Controlador para obtener los detalles de un restaurante
const getRestaurantByIdController = async (req, res) => {
    try {
        const restaurant = await (0, restaurant_service_1.getRestaurantDetailsService)(req.params.id);
        if (!restaurant) {
            res.status(404).json({ message: "Restaurante no encontrado" });
            return;
        }
        res.status(200).json(restaurant);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener el restaurante", error });
    }
};
exports.getRestaurantByIdController = getRestaurantByIdController;
//* Controlador para actualizar un restaurante
const updateRestaurantController = async (req, res) => {
    try {
        const updatedRestaurant = await (0, restaurant_service_1.updateRestaurantService)(req.params.id, req.body);
        if (!updatedRestaurant) {
            res.status(404).json({ message: "Restaurante no encontrado" });
            return;
        }
        res.status(200).json(updatedRestaurant);
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el restaurante", error });
    }
};
exports.updateRestaurantController = updateRestaurantController;
//*Controlador para obtener restaurantes a cargo de un manager
const getRestaurantsByManagerIdController = async (req, res) => {
    try {
        const restaurants = await (0, restaurant_service_1.getRestaurantsByManagerIdService)(req.params.id);
        if (!restaurants) {
            res.status(404).json({ message: "No se encontraron restaurantes para este manager" });
            return;
        }
        res.status(200).json(restaurants);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los restaurantes", error });
    }
};
exports.getRestaurantsByManagerIdController = getRestaurantsByManagerIdController;
const checkManagerRoleController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const { restaurantId } = req.params;
        const userId = req.user.id;
        const isManager = await (0, restaurant_service_1.checkUserRoleInRestaurantService)(restaurantId, userId);
        res.status(200).json({ isManager });
    }
    catch (error) {
        console.error("Error verificando rol:", error);
        if (error === "Restaurante no encontrado") {
            res.status(404).json({ message: error });
            return;
        }
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.checkManagerRoleController = checkManagerRoleController;
const getSearchResultsController = async (req, res) => {
    try {
        const query = req.query.q;
        if (!query) {
            res.status(400).json({ message: "Parámetro de búsqueda no válido" });
            return;
        }
        const results = await (0, search_service_1.getRestaurantByNameService)(query);
        res.json(results);
    }
    catch (error) {
        console.error("Error en la búsqueda:", error);
        res.status(500).json({ message: "Error en la búsqueda", error });
    }
};
exports.getSearchResultsController = getSearchResultsController;
// Obtener las fotos de la galería de un restaurante
const getGalleryPhotosController = async (req, res) => {
    try {
        const { id: restaurantId } = req.params;
        const photos = await (0, restaurant_service_1.getGalleryPhotosService)(restaurantId);
        res.status(200).json({ success: true, photos });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};
exports.getGalleryPhotosController = getGalleryPhotosController;
// Agregar una foto a la galería de un restaurante
const addPhotoToGalleryController = async (req, res) => {
    try {
        const { id: restaurantId } = req.params;
        if (!req.file) {
            res.status(400).json({ success: false, message: "No se subió ninguna foto" });
            return;
        }
        const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        const updatedGallery = await (0, restaurant_service_1.addPhotoToGalleryService)(restaurantId, photoUrl);
        res.status(200).json({ success: true, gallery: updatedGallery });
    }
    catch (error) {
        console.error("Error al agregar la foto:", error);
        res.status(500).json({ success: false, message: "Error al agregar la foto a la galería" });
    }
};
exports.addPhotoToGalleryController = addPhotoToGalleryController;
// Eliminar una foto de la galería de un restaurante
const removePhotoFromGalleryController = async (req, res) => {
    try {
        const { id: restaurantId } = req.params;
        const { photoUrl } = req.body;
        if (!photoUrl) {
            res.status(400).json({ success: false, message: "URL de la foto es requerida" });
            return;
        }
        const updatedGallery = await (0, restaurant_service_1.removePhotoFromGalleryService)(restaurantId, photoUrl);
        res.status(200).json({ success: true, gallery: updatedGallery });
    }
    catch (error) {
        res.status(500).json({ success: false, message: error });
    }
};
exports.removePhotoFromGalleryController = removePhotoFromGalleryController;
const getNearbyRestaurantsController = async (req, res) => {
    try {
        const { lat, lng, radius } = req.query;
        if (!lat || !lng || !radius) {
            res.status(400).json({ message: "Faltan parámetros obligatorios (lat, lng, radius)." });
            return;
        }
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const searchRadius = parseInt(radius);
        if (isNaN(latitude) || isNaN(longitude) || isNaN(searchRadius)) {
            res.status(400).json({ message: "Los parámetros (lat, lng, radius) deben ser números válidos." });
            return;
        }
        const nearbyRestaurants = await (0, search_service_1.getPlacesNearbyService)(latitude, longitude, searchRadius);
        res.status(200).json(nearbyRestaurants.length ? nearbyRestaurants : { message: "No se encontraron restaurantes cercanos." });
    }
    catch (error) {
        res.status(500).json({ message: "Error al buscar restaurantes cercanos", error });
    }
};
exports.getNearbyRestaurantsController = getNearbyRestaurantsController;
