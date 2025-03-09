import { Router } from 'express';
import { validateLocationParams } from '../../../middlewares/location.middleware';
import { getNearbyRestaurantsController } from '../controllers/restauranteUbicacion.controller';

const router = Router();

/**
 * @swagger
 * /api/v1/restaurants/nearby:
 *   get:
 *     summary: Obtener restaurantes cercanos
 *     description: Retorna una lista de restaurantes dentro de un radio específico desde una ubicación dada.
 *     tags:
 *       - Restaurants
 *     responses:
 *       200:
 *         description: Restaurantes cercanos obtenidos con éxito.
 */
router.get('/nearby', validateLocationParams,  getNearbyRestaurantsController );

export default router;
