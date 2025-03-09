import express from "express";
import { searchRestaurantsByNameController } from "../controllers/restauranteBusqueda.controller";

const router = express.Router();

/**
 * @swagger
 * /api/search/restaurants/by-name:
 *   get:
 *     summary: Buscar restaurantes por nombre
 *     description: Devuelve una lista de restaurantes ordenados alfabéticamente que coinciden con el nombre ingresado.
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         required: true
 *         description: Nombre parcial o completo del restaurante
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         required: false
 *         description: Número máximo de resultados a devolver (default: 10)
 *     responses:
 *       200:
 *         description: Lista de restaurantes coincidentes ordenados alfabéticamente.
 *       400:
 *         description: Parámetro de búsqueda no válido.
 *       500:
 *         description: Error interno del servidor.
 */
router.get("/restaurants/by-name", searchRestaurantsByNameController);

export default router;
