import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import {
  getReviewSentimentStatsController,
  getAverageReviewController,
  getReportedReviewsController
} from "../controllers/resenasAnaliticas.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/reviews/analytics/sentiment:
 *   get:
 *     summary: Obtener análisis de sentimiento de reseñas
 *     description: Retorna un resumen de reviews positivas vs negativas en el tiempo.
 *     tags:
 *       - Reviews Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Estadísticas de sentimiento obtenidas correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado.
 */
router.get("/analytics/sentiment", authMiddleware, roleMiddleware(["superadmin"]), getReviewSentimentStatsController);

/**
 * @swagger
 * /api/v1/reviews/analytics/average-ratings:
 *   get:
 *     summary: Obtener el promedio de calificaciones
 *     description: Calcula el promedio de calificaciones, agrupado por restaurante si se solicita.
 *     tags:
 *       - Reviews Analytics
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: query
 *         name: groupBy
 *         schema:
 *           type: string
 *         required: false
 *         description: Agrupar por restaurante o por usuario.
 *     responses:
 *       200:
 *         description: Promedio de calificaciones obtenido correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado.
 */
router.get("/analytics/average-ratings", authMiddleware, roleMiddleware(["superadmin", "manager"]), getAverageReviewController);

/**
 * @swagger
 * /api/v1/reviews/analytics/reported:
 *   get:
 *     summary: Obtener reseñas reportadas
 *     description: Lista todas las reseñas marcadas como ofensivas o falsas.
 *     tags:
 *       - Reviews Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reseñas reportadas obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado.
 */
router.get("/analytics/reported", authMiddleware, roleMiddleware(["superadmin", "manager"]), getReportedReviewsController);

export default router;
