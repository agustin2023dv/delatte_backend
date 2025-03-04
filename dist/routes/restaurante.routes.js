"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const restaurante_controller_1 = require("../controllers/restaurante.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const restaurant_middleware_1 = require("../middlewares/restaurant.middleware");
const resena_controller_1 = require("../controllers/resena.controller");
const upload_middleware_1 = require("../middlewares/upload.middleware");
const location_middleware_1 = require("../middlewares/location.middleware");
const router = (0, express_1.Router)();
//*Ruta para OBTENER todos los restaurantes
router.get('/', restaurante_controller_1.getAllRestaurantsController);
//* Ruta para buscar restaurantes por ubicación o tipo de comida
router.get('/search', restaurante_controller_1.getSearchResultsController);
//* Ruta para CREAR un restaurante (solo superadmins o managers pueden crear)
router.post('/register-restaurant', restaurante_controller_1.registerRestaurantAndManagerController);
//* Ruta para OBTENER la información de un restaurante (cualquier usuario autenticado puede acceder)
router.get('/:id', restaurante_controller_1.getRestaurantByIdController);
//* Ruta para ACTUALIZAR la información de un restaurante (solo el manager del restaurante o superadmin puede actualizar)
router.put('/:id', auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware, // Verificar que sea el manager del restaurante o superadmin
restaurante_controller_1.updateRestaurantController);
//*Ruta para obtener los restaurantes gestionados por un manager
router.get('/managerId/:id', restaurante_controller_1.getRestaurantsByManagerIdController);
//*Ruta para obtener las reviews del restaurante
router.get('/:id/reviews', resena_controller_1.getReviewsByRestaurantController);
//* Rutas relacionadas con la galería de fotos
router.get("/:id/gallery", auth_middleware_1.authMiddleware, restaurante_controller_1.getGalleryPhotosController);
router.post("/:id/gallery", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware, upload_middleware_1.uploadMiddleware, // Middleware de multer para manejar la subida de archivos
restaurante_controller_1.addPhotoToGalleryController);
router.delete("/:id/gallery", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware, restaurante_controller_1.removePhotoFromGalleryController);
router.get('/:restaurantId/is-manager', auth_middleware_1.authMiddleware, restaurante_controller_1.checkManagerRoleController);
// Ruta para obtener restaurantes cercanos
router.get("/nearby/:lng/:lat/:radius", location_middleware_1.validateLocationParams, restaurante_controller_1.getNearbyRestaurantsController);
exports.default = router;
