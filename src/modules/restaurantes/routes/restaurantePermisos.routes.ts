import { Router } from 'express';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { isManagerController } from '../controllers/restaurantePermisos.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/restaurants/{id}/is-manager:
 *   get:
 *     summary: Verificar si un usuario es manager de un restaurante
 *     description: Comprueba si un usuario tiene permisos de manager sobre un restaurante específico.
 *     tags:
 *       - Restaurants
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Usuario es manager.
 */
router.get('/:id/is-manager', authMiddleware, isManagerController);


export default router;
