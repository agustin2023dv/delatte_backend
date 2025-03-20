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
exports.RestaurantGalleryController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const restaurantGallery_types_1 = require("../types/restaurantGallery.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const restaurant_middleware_1 = require("../../../middlewares/restaurant.middleware");
const upload_middleware_1 = require("../../../middlewares/upload.middleware");
let RestaurantGalleryController = class RestaurantGalleryController {
    restaurantGalleryService;
    constructor(restaurantGalleryService) {
        this.restaurantGalleryService = restaurantGalleryService;
    }
    /**
     * @swagger
     * /api/v1/restaurants/{id}/gallery:
     *   get:
     *     summary: Obtener fotos de la galería de un restaurante
     *     description: Devuelve todas las fotos asociadas a un restaurante.
     *     tags:
     *       - Restaurants
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Galería obtenida con éxito.
     */
    async getGalleryPhotos(req, res) {
        try {
            const { id: restaurantId } = req.params;
            const photos = await this.restaurantGalleryService.getGalleryPhotos(restaurantId);
            res.status(200).json({ success: true, photos });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Error al obtener las fotos de la galería" });
        }
    }
    /**
     * @swagger
     * /api/v1/restaurants/{id}/gallery:
     *   post:
     *     summary: Agregar foto a la galería de un restaurante
     *     description: Permite a un manager o superadmin subir fotos a la galería de un restaurante.
     *     tags:
     *       - Restaurants
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Foto añadida con éxito.
     */
    async addPhotoToGallery(req, res) {
        try {
            const { id: restaurantId } = req.params;
            if (!req.file) {
                res.status(400).json({ success: false, message: "No se subió ninguna foto" });
                return;
            }
            const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
            const updatedGallery = await this.restaurantGalleryService.addPhotoToGallery(restaurantId, photoUrl);
            res.status(200).json({ success: true, gallery: updatedGallery });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Error al agregar la foto a la galería" });
        }
    }
    /**
     * @swagger
     * /api/v1/restaurants/{id}/gallery:
     *   delete:
     *     summary: Eliminar una foto de la galería
     *     description: Permite a un manager o superadmin eliminar fotos de la galería de un restaurante.
     *     tags:
     *       - Restaurants
     *     security:
     *       - BearerAuth: []
     *     responses:
     *       200:
     *         description: Foto eliminada con éxito.
     */
    async removePhotoFromGallery(req, res) {
        try {
            const { id: restaurantId } = req.params;
            const { photoUrl } = req.body;
            if (!photoUrl) {
                res.status(400).json({ success: false, message: "URL de la foto es requerida" });
                return;
            }
            const updatedGallery = await this.restaurantGalleryService.removePhotoFromGallery(restaurantId, photoUrl);
            res.status(200).json({ success: true, gallery: updatedGallery });
        }
        catch (error) {
            res.status(500).json({ success: false, message: "Error al eliminar la foto de la galería" });
        }
    }
};
exports.RestaurantGalleryController = RestaurantGalleryController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id/gallery", auth_middleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantGalleryController.prototype, "getGalleryPhotos", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/:id/gallery", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware, upload_middleware_1.uploadMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantGalleryController.prototype, "addPhotoToGallery", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/:id/gallery", auth_middleware_1.authMiddleware, restaurant_middleware_1.managerOfRestaurantMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], RestaurantGalleryController.prototype, "removePhotoFromGallery", null);
exports.RestaurantGalleryController = RestaurantGalleryController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/restaurants"),
    __param(0, (0, inversify_1.inject)(restaurantGallery_types_1.RESTAURANT_GALLERY_TYPES.IRestaurantGalleryService)),
    __metadata("design:paramtypes", [Object])
], RestaurantGalleryController);
