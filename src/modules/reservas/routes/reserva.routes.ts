import express from "express";
import { 
  cancelReservationController, 
  updateReservationController, 
  getAllReservationsController, 
  getReservationByIdController, 
  getUserReservationsController,
  getReservationsByRestaurantController, 
  getReservationsByUserController, 
  createReservationController
} from "../controllers/reserva.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import { checkDisponibilidadMiddleware, validateReservationData } from "../../../middlewares/reservation.middleware";
import { getReviewsByRestaurantController } from "../../resenas/controllers/resena.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/reservations:
 *   post:
 *     summary: Crear una nueva reserva
 *     description: Permite a los usuarios realizar una reserva en un restaurante.
 *     tags:
 *       - Reservations
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
 *                 example: "65b25e78f4b3b3f11a4c1d88"
 *               fecha:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-04-10T19:00:00.000Z"
 *               cantidadPersonas:
 *                 type: number
 *                 example: 4
 *     responses:
 *       201:
 *         description: Reserva creada con éxito.
 *       400:
 *         description: Datos inválidos.
 *       401:
 *         description: Usuario no autenticado.
 *       409:
 *         description: No hay disponibilidad en el restaurante.
 */
router.post(
  "/",
  authMiddleware,
  validateReservationData,
  checkDisponibilidadMiddleware,
  createReservationController
);

/**
 * @swagger
 * /api/v1/reservations/{id}/reviews:
 *   get:
 *     summary: Obtener reseñas de un restaurante
 *     description: Retorna las reseñas de un restaurante a partir de una reserva.
 *     tags:
 *       - Reservations
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
 *       404:
 *         description: No se encontraron reseñas.
 */
router.get('/:id/reviews', getReviewsByRestaurantController);

/**
 * @swagger
 * /api/v1/reservations:
 *   get:
 *     summary: Obtener reservas del usuario autenticado
 *     description: Devuelve todas las reservas realizadas por el usuario actual.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida correctamente.
 *       401:
 *         description: Usuario no autenticado.
 */
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["customer", "manager"]),
  getUserReservationsController
);

/**
 * @swagger
 * /api/v1/reservations/restaurant/{id}:
 *   get:
 *     summary: Obtener reservas de un restaurante
 *     description: Devuelve todas las reservas realizadas en un restaurante específico.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante.
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida correctamente.
 *       403:
 *         description: No autorizado.
 */
router.get(
  "/restaurant/:id",
  authMiddleware,
  roleMiddleware(["superadmin", "manager"]),
  getReservationsByRestaurantController
);

/**
 * @swagger
 * /api/v1/reservations/user/{id}:
 *   get:
 *     summary: Obtener reservas de un usuario
 *     description: Devuelve todas las reservas de un usuario específico (solo para superadmins).
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida correctamente.
 *       403:
 *         description: No autorizado.
 */
router.get(
  "/user/:id",
  authMiddleware,
  roleMiddleware(["superadmin"]),
  getReservationsByUserController
);

/**
 * @swagger
 * /api/v1/reservations/{id}/cancel:
 *   put:
 *     summary: Cancelar una reserva
 *     description: Permite a un usuario cancelar su reserva.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva.
 *     responses:
 *       200:
 *         description: Reserva cancelada con éxito.
 *       403:
 *         description: No autorizado.
 */
router.put(
  "/:id/cancel",
  authMiddleware,
  cancelReservationController
);

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   put:
 *     summary: Modificar una reserva
 *     description: Permite a un usuario modificar su reserva.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva.
 *     responses:
 *       200:
 *         description: Reserva modificada con éxito.
 *       403:
 *         description: No autorizado.
 */
router.put(
  "/:id", 
  authMiddleware,
  validateReservationData,
  updateReservationController
);

/**
 * @swagger
 * /api/v1/reservations:
 *   get:
 *     summary: Obtener todas las reservas (solo superadmins)
 *     description: Devuelve todas las reservas registradas en la plataforma.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reservas obtenida correctamente.
 *       403:
 *         description: No autorizado.
 */
router.get(
  "/all",
  authMiddleware,
  roleMiddleware(["superadmin"]),
  getAllReservationsController
);

/**
 * @swagger
 * /api/v1/reservations/{id}:
 *   get:
 *     summary: Obtener detalles de una reserva
 *     description: Retorna los detalles de una reserva específica.
 *     tags:
 *       - Reservations
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la reserva.
 *     responses:
 *       200:
 *         description: Datos de la reserva obtenidos correctamente.
 *       403:
 *         description: No autorizado.
 */
router.get(
  "/:id",
  authMiddleware,
  getReservationByIdController
);

export default router;
