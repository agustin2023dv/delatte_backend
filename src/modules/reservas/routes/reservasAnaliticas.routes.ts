import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import {
  getReservasDiariasController,
  getReservasSemanalesController,
  getReservasMensualesController,
  getReservasPorLocalidadController,
  getReservasPorRestauranteController,
  getReservasCanceladasController,
  getTopHorariosController,
  getPronosticoReservasController
} from "../controllers/reservasAnaliticas.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/reservations/analytics/daily:
 *   get:
 *     summary: Obtener cantidad de reservas diarias
 *     description: Retorna la cantidad de reservas agrupadas por día.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para acceder a esta información.
 */
router.get("/daily", authMiddleware, roleMiddleware(["superadmin", "manager"]), getReservasDiariasController);

/**
 * @swagger
 * /api/v1/reservations/analytics/weekly:
 *   get:
 *     summary: Obtener cantidad de reservas semanales
 *     description: Retorna la cantidad de reservas agrupadas por semana.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 */
router.get("/weekly", authMiddleware, roleMiddleware(["superadmin", "manager"]), getReservasSemanalesController);

/**
 * @swagger
 * /api/v1/reservations/analytics/monthly:
 *   get:
 *     summary: Obtener cantidad de reservas mensuales
 *     description: Retorna la cantidad de reservas agrupadas por mes.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 */
router.get("/monthly", authMiddleware, roleMiddleware(["superadmin", "manager"]), getReservasMensualesController);

/**
 * @swagger
 * /api/v1/reservations/analytics/by-location:
 *   get:
 *     summary: Obtener reservas agrupadas por localidad
 *     description: Retorna la cantidad de reservas agrupadas por localidad.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 */
router.get("/by-location", authMiddleware, roleMiddleware(["superadmin"]), getReservasPorLocalidadController);

/**
 * @swagger
 * /api/v1/reservations/analytics/by-restaurant:
 *   get:
 *     summary: Obtener cantidad de reservas por restaurante
 *     description: Retorna la cantidad de reservas agrupadas por restaurante.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 */
router.get("/by-restaurant", authMiddleware, roleMiddleware(["superadmin"]), getReservasPorRestauranteController);

/**
 * @swagger
 * /api/v1/reservations/analytics/cancellations:
 *   get:
 *     summary: Obtener listado de reservas canceladas con motivo
 *     description: Retorna la lista de reservas canceladas junto con el motivo.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 */
router.get("/cancellations", authMiddleware, roleMiddleware(["superadmin", "manager"]), getReservasCanceladasController);

/**
 * @swagger
 * /api/v1/reservations/analytics/top-hours:
 *   get:
 *     summary: Obtener los horarios con más reservas
 *     description: Devuelve los horarios más concurridos en la plataforma.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Datos obtenidos correctamente.
 */
router.get("/top-hours", authMiddleware, roleMiddleware(["superadmin", "manager"]), getTopHorariosController);

/**
 * @swagger
 * /api/v1/reservations/analytics/prediction:
 *   get:
 *     summary: Obtener predicción de demanda de reservas
 *     description: Genera una predicción de demanda basada en el histórico de reservas.
 *     tags:
 *       - Reservations Analytics
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Predicción generada correctamente.
 */
router.get("/prediction", authMiddleware, roleMiddleware(["superadmin"]), getPronosticoReservasController);

export default router;
