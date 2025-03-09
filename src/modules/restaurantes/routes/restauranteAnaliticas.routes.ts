import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import {
  getTopRestaurantsController,
  getWorstPerformingRestaurantsController,
  getNewRestaurantsController,
  getSaturatedRestaurantsController,
} from "../controllers/restauranteAnaliticas.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/restaurants/analytics/top:
 *   get:
 *     summary: Obtener los restaurantes con más reservas y mejores calificaciones
 *     description: Devuelve una lista de los restaurantes mejor calificados y con más reservas en la plataforma.
 *     tags:
 *       - Restaurant Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de los mejores restaurantes obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/top", authMiddleware, roleMiddleware(["superadmin", "manager"]), getTopRestaurantsController);

/**
 * @swagger
 * /api/v1/restaurants/analytics/worst-performing:
 *   get:
 *     summary: Obtener los restaurantes con menos reservas y peores calificaciones
 *     description: Devuelve una lista de los restaurantes con menor desempeño en términos de reservas y calificaciones.
 *     tags:
 *       - Restaurant Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de los restaurantes con menor desempeño obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/worst-performing", authMiddleware, roleMiddleware(["superadmin", "manager"]), getWorstPerformingRestaurantsController);

/**
 * @swagger
 * /api/v1/restaurants/analytics/new:
 *   get:
 *     summary: Obtener los restaurantes recién agregados
 *     description: Devuelve una lista de los restaurantes que se han registrado recientemente en la plataforma.
 *     tags:
 *       - Restaurant Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de los restaurantes nuevos obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/new", authMiddleware, roleMiddleware(["superadmin", "manager"]), getNewRestaurantsController);

/**
 * @swagger
 * /api/v1/restaurants/analytics/saturation:
 *   get:
 *     summary: Obtener restaurantes con alta ocupación y baja disponibilidad
 *     description: Devuelve una lista de los restaurantes con alta demanda y disponibilidad limitada.
 *     tags:
 *       - Restaurant Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de los restaurantes saturados obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/saturation", authMiddleware, roleMiddleware(["superadmin", "manager"]), getSaturatedRestaurantsController);

export default router;
