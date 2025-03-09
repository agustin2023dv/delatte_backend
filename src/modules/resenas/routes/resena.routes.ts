import express from 'express';
import { 
  createReviewController, 
  getReviewsByRestaurantController,
  getAllReviewsController,
  getReviewsByUserController,
  updateReviewController, 
  deleteReviewController 
} from '../controllers/resena.controller';

import { validateReview, validateReviewUpdate } from '@delatte/shared/utils';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { roleMiddleware } from '../../../middlewares/role.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Obtener todas las reseñas
 *     description: Solo los superadmins pueden acceder a todas las reseñas.
 *     tags:
 *       - Reviews
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida correctamente.
 *       403:
 *         description: No autorizado.
 */
router.get('/', authMiddleware, roleMiddleware(['superadmin']), getAllReviewsController);

/**
 * @swagger
 * /api/v1/restaurants/{id}/reviews:
 *   get:
 *     summary: Obtener reseñas de un restaurante
 *     description: Devuelve todas las reseñas de un restaurante específico.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante.
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida correctamente.
 */
router.get('/restaurants/:id/reviews', authMiddleware, getReviewsByRestaurantController);

/**
 * @swagger
 * /api/v1/users/{id}/reviews:
 *   get:
 *     summary: Obtener reseñas de un usuario
 *     description: Devuelve todas las reseñas escritas por un usuario específico.
 *     tags:
 *       - Reviews
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Lista de reseñas obtenida correctamente.
 */
router.get('/users/:id/reviews', authMiddleware, getReviewsByUserController);

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Crear una nueva reseña
 *     description: Solo los clientes pueden dejar reseñas sobre restaurantes.
 *     tags:
 *       - Reviews
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               restauranteId:
 *                 type: string
 *                 example: "65f23ab1d32b8c001f5e7c21"
 *               calificacion:
 *                 type: number
 *                 example: 4.5
 *               comentario:
 *                 type: string
 *                 example: "La comida estuvo excelente y la atención inmejorable."
 *     responses:
 *       201:
 *         description: Reseña creada con éxito.
 */
router.post('/', 
    authMiddleware, 
    roleMiddleware(['customer']), 
    validateReview, 
    createReviewController);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Editar una reseña
 *     description: Solo los clientes pueden editar sus propias reseñas.
 *     tags:
 *       - Reviews
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calificacion:
 *                 type: number
 *                 example: 4
 *               comentario:
 *                 type: string
 *                 example: "Buena comida, pero el servicio fue lento."
 *     responses:
 *       200:
 *         description: Reseña actualizada con éxito.
 */
router.put('/:id', 
    authMiddleware, 
    roleMiddleware(['customer']),
    validateReviewUpdate, 
    updateReviewController);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Eliminar una reseña
 *     description: Un cliente puede eliminar su propia reseña, y los superadmins pueden eliminar cualquier reseña.
 *     tags:
 *       - Reviews
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reseña a eliminar.
 *     responses:
 *       204:
 *         description: Reseña eliminada con éxito.
 */
router.delete('/:id', 
    authMiddleware, 
    roleMiddleware(['customer', 'superadmin']), 
    deleteReviewController);

export default router;
