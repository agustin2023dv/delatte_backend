import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import {
  getPromotionCountController,
  getTopRestaurantsByPromotionsController,
  getPromotionImpactController,
  getIneffectivePromotionsController,
} from "../controllers/promocionAnaliticas.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/promotions/analytics/count:
 *   get:
 *     summary: Obtener cantidad de promociones por estado
 *     description: Devuelve un resumen de la cantidad de promociones activas, expiradas y programadas.
 *     tags:
 *       - Promotions Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Cantidad de promociones obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/analytics/promotions", authMiddleware, roleMiddleware(["superadmin"]), getPromotionCountController);

/**
 * @swagger
 * /api/v1/promotions/analytics/top-restaurants:
 *   get:
 *     summary: Obtener restaurantes con más promociones creadas
 *     description: Devuelve la lista de restaurantes con mayor cantidad de promociones registradas en la plataforma.
 *     tags:
 *       - Promotions Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de restaurantes con más promociones obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/analytics/top-restaurants", authMiddleware, roleMiddleware(["superadmin"]), getTopRestaurantsByPromotionsController);

/**
 * @swagger
 * /api/v1/promotions/analytics/impact:
 *   get:
 *     summary: Obtener el impacto de promociones en reservas
 *     description: Analiza cómo las promociones afectan el número de reservas realizadas en los restaurantes.
 *     tags:
 *       - Promotions Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Impacto de las promociones en las reservas obtenido correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/analytics/impact", authMiddleware, roleMiddleware(["superadmin"]), getPromotionImpactController);

/**
 * @swagger
 * /api/v1/promotions/analytics/ineffective:
 *   get:
 *     summary: Obtener promociones sin impacto en reservas
 *     description: Devuelve una lista de promociones que no han generado reservas en los restaurantes.
 *     tags:
 *       - Promotions Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de promociones inefectivas obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/analytics/ineffective", authMiddleware, roleMiddleware(["superadmin"]), getIneffectivePromotionsController);

export default router;
