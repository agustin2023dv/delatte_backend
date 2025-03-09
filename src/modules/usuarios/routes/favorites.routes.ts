import express from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import {
  addFavoriteRestaurantController,
  getUserFavoritesController,
  removeFavoriteRestaurantController
} from '../controllers/favorite.controller';

const router = express.Router();

/**
 * @swagger
 * /api/v1/favorites:
 *   get:
 *     summary: Obtener restaurantes favoritos del usuario
 *     description: Devuelve una lista de los restaurantes que el usuario ha marcado como favoritos.
 *     tags:
 *       - Favorites
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de restaurantes favoritos obtenida correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "65c1f0d234b6a10f12345678"
 *                   nombre:
 *                     type: string
 *                     example: "La Pizzería de Juan"
 *                   direccion:
 *                     type: string
 *                     example: "Calle 123, Ciudad"
 *       401:
 *         description: Usuario no autenticado.
 */
router.get("/", authMiddleware, getUserFavoritesController);

/**
 * @swagger
 * /api/v1/favorites:
 *   post:
 *     summary: Agregar un restaurante a favoritos
 *     description: Permite a un usuario marcar un restaurante como favorito.
 *     tags:
 *       - Favorites
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 example: "65c1f0d234b6a10f12345678"
 *     responses:
 *       201:
 *         description: Restaurante agregado a favoritos con éxito.
 *       400:
 *         description: El restaurante ya está en favoritos o el ID es inválido.
 *       401:
 *         description: Usuario no autenticado.
 */
router.post("/", authMiddleware, addFavoriteRestaurantController);

/**
 * @swagger
 * /api/v1/favorites:
 *   delete:
 *     summary: Eliminar un restaurante de favoritos
 *     description: Permite a un usuario eliminar un restaurante de su lista de favoritos.
 *     tags:
 *       - Favorites
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 example: "65c1f0d234b6a10f12345678"
 *     responses:
 *       200:
 *         description: Restaurante eliminado de favoritos con éxito.
 *       400:
 *         description: El restaurante no está en favoritos o el ID es inválido.
 *       401:
 *         description: Usuario no autenticado.
 */
router.delete("/", authMiddleware, removeFavoriteRestaurantController);

export default router;
