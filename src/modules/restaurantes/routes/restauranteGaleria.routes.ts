import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { managerOfRestaurantMiddleware } from '../../../middlewares/restaurant.middleware';
import { addPhotoToGalleryController,
     getGalleryPhotosController, removePhotoFromGalleryController } from '../controllers/restauranteGaleria.controller';
import { uploadMiddleware } from '../../../middlewares/upload.middleware';

const router = Router();

/**
 * @swagger
 * /api/v1/restaurants/{id}/gallery:
 *   get:
 *     summary: Obtener fotos de la galería de un restaurante
 *     description: Devuelve todas las fotos asociadas a un restaurante.
 *     tags:
 *       - Restaurants
 *     responses:
 *       200:
 *         description: Galería obtenida con éxito.
 */
router.get('/:id/gallery', authMiddleware, getGalleryPhotosController);

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
router.post('/:id/gallery', authMiddleware, managerOfRestaurantMiddleware, uploadMiddleware, addPhotoToGalleryController);

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
router.delete('/:id/gallery', authMiddleware, managerOfRestaurantMiddleware, removePhotoFromGalleryController);

export default router;
