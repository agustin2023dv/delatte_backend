import express from "express";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";
import {
  createPromotionController,
  getPromotionsController,
  updatePromotionController,
  deletePromotionController,
} from "../controllers/promocion.controller";

const router = express.Router();

/**
 * @swagger
 * /api/v1/promotions:
 *   post:
 *     summary: Crear una nueva promoción para un restaurante
 *     description: Permite a un manager o superadmin crear una promoción para su restaurante.
 *     tags:
 *       - Promotions
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Descuento del 20% en pizzas"
 *               descripcion:
 *                 type: string
 *                 example: "Aplica a pizzas grandes todos los viernes."
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-15T00:00:00Z"
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-31T23:59:59Z"
 *               descuento:
 *                 type: number
 *                 example: 20
 *     responses:
 *       201:
 *         description: Promoción creada con éxito.
 *       400:
 *         description: Datos inválidos proporcionados.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para crear promociones en este restaurante.
 */
router.post("/:id", authMiddleware, managerOfRestaurantMiddleware, createPromotionController);

/**
 * @swagger
 * /api/v1/promotions/{id}:
 *   get:
 *     summary: Obtener todas las promociones activas de un restaurante
 *     description: Retorna la lista de promociones activas de un restaurante específico.
 *     tags:
 *       - Promotions
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante.
 *     responses:
 *       200:
 *         description: Lista de promociones obtenida correctamente.
 *       404:
 *         description: No se encontraron promociones activas.
 */
router.get("/:id", getPromotionsController);

/**
 * @swagger
 * /api/v1/promotions/{id}/{promoId}:
 *   put:
 *     summary: Actualizar una promoción específica
 *     description: Permite a un manager o superadmin actualizar una promoción de su restaurante.
 *     tags:
 *       - Promotions
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante.
 *       - in: path
 *         name: promoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la promoción a actualizar.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *                 example: "Descuento del 25% en pizzas"
 *               descripcion:
 *                 type: string
 *                 example: "Aplica a pizzas grandes todos los viernes y sábados."
 *               fechaInicio:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-03-15T00:00:00Z"
 *               fechaFin:
 *                 type: string
 *                 format: date-time
 *                 example: "2024-04-01T23:59:59Z"
 *               descuento:
 *                 type: number
 *                 example: 25
 *     responses:
 *       200:
 *         description: Promoción actualizada con éxito.
 *       400:
 *         description: Datos inválidos proporcionados.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para modificar esta promoción.
 *       404:
 *         description: Promoción no encontrada.
 */
router.put("/:id/promotions/:promoId", authMiddleware, managerOfRestaurantMiddleware, updatePromotionController);

/**
 * @swagger
 * /api/v1/promotions/{id}/{promoId}:
 *   delete:
 *     summary: Eliminar una promoción específica
 *     description: Permite a un manager o superadmin eliminar una promoción de su restaurante.
 *     tags:
 *       - Promotions
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante.
 *       - in: path
 *         name: promoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la promoción a eliminar.
 *     responses:
 *       200:
 *         description: Promoción eliminada con éxito.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para eliminar esta promoción.
 *       404:
 *         description: Promoción no encontrada.
 */
router.delete("/:id/promotions/:promoId", authMiddleware, managerOfRestaurantMiddleware, deletePromotionController);

export default router;
