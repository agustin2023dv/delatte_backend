import express from "express";
import { addAddressController, getUserAddressesController, removeAddressController } from "../controllers/address.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Addresses
 *   description: Endpoints para gestionar las direcciones de los usuarios
 */

/**
 * @swagger
 * /api/addresses:
 *   get:
 *     summary: Obtener todas las direcciones del usuario autenticado
 *     description: Retorna la lista de direcciones asociadas al usuario autenticado.
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de direcciones obtenida correctamente.
 *       401:
 *         description: No autorizado. Token inválido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/", authMiddleware, getUserAddressesController);

/**
 * @swagger
 * /api/addresses:
 *   post:
 *     summary: Agregar una nueva dirección al usuario autenticado
 *     description: Permite agregar una dirección a la cuenta del usuario autenticado.
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "Av. 18 de Julio 1234, Montevideo, Uruguay"
 *     responses:
 *       201:
 *         description: Dirección agregada correctamente.
 *       400:
 *         description: Datos inválidos o faltantes.
 *       401:
 *         description: No autorizado. Token inválido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.post("/", authMiddleware, addAddressController);

/**
 * @swagger
 * /api/addresses:
 *   delete:
 *     summary: Eliminar una dirección del usuario autenticado
 *     description: Permite eliminar una dirección previamente guardada por el usuario autenticado.
 *     tags: [Addresses]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               address:
 *                 type: string
 *                 example: "Av. 18 de Julio 1234, Montevideo, Uruguay"
 *     responses:
 *       200:
 *         description: Dirección eliminada correctamente.
 *       400:
 *         description: Datos inválidos o dirección no encontrada.
 *       401:
 *         description: No autorizado. Token inválido o no proporcionado.
 *       500:
 *         description: Error interno del servidor.
 */
router.delete("/", authMiddleware, removeAddressController);

export default router;
