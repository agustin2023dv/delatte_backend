import { Router } from 'express';
import { registerRestaurantAndManagerController, getRestaurantByIdController, 
  updateRestaurantController,
  getAllRestaurantsController,
  getRestaurantsByManagerIdController} 
from '../controllers/restaurante.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { managerOfRestaurantMiddleware } from '../../../middlewares/restaurant.middleware';


const router = Router();

/**
 * @swagger
 * /api/v1/restaurants:
 *   get:
 *     summary: Obtener todos los restaurantes
 *     description: Devuelve una lista de todos los restaurantes registrados en la plataforma.
 *     tags:
 *       - Restaurants
 *     responses:
 *       200:
 *         description: Lista de restaurantes obtenida correctamente.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/', getAllRestaurantsController);


/**
 * @swagger
 * /api/v1/restaurants:
 *   post:
 *     summary: Crear un nuevo restaurante
 *     description: Permite a un manager o superadmin registrar un restaurante en la plataforma.
 *     tags:
 *       - Restaurants
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: "La Parrilla de Juan"
 *               direccion:
 *                 type: string
 *                 example: "Av. 18 de Julio 1234, Montevideo, Uruguay"
 *               telefono:
 *                 type: string
 *                 example: "+598 1234 5678"
 *               emailContacto:
 *                 type: string
 *                 example: "contacto@laparrilla.com"
 *     responses:
 *       201:
 *         description: Restaurante creado con éxito.
 *       400:
 *         description: Datos inválidos proporcionados.
 *       401:
 *         description: Usuario no autenticado.
 */
router.post('/', authMiddleware, managerOfRestaurantMiddleware, registerRestaurantAndManagerController);

/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   get:
 *     summary: Obtener información de un restaurante por ID
 *     description: Retorna los detalles de un restaurante específico.
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del restaurante.
 *     responses:
 *       200:
 *         description: Datos del restaurante obtenidos correctamente.
 *       404:
 *         description: Restaurante no encontrado.
 */
router.get('/:id', getRestaurantByIdController);

/**
 * @swagger
 * /api/v1/restaurants/{id}:
 *   put:
 *     summary: Actualizar restaurante
 *     description: Permite a un manager o superadmin actualizar la información de un restaurante.
 *     tags:
 *       - Restaurants
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
 *               nombre:
 *                 type: string
 *                 example: "Nuevo Nombre del Restaurante"
 *               direccion:
 *                 type: string
 *                 example: "Nueva Dirección 123"
 *     responses:
 *       200:
 *         description: Restaurante actualizado con éxito.
 *       400:
 *         description: Datos inválidos proporcionados.
 *       401:
 *         description: Usuario no autenticado.
 *       403:
 *         description: No autorizado para modificar este restaurante.
 */
router.put('/:id', authMiddleware, managerOfRestaurantMiddleware, updateRestaurantController);

/**
 * @swagger
 * /api/v1/restaurants/managers/{id}/restaurants:
 *   get:
 *     summary: Obtener restaurantes gestionados por un manager
 *     description: Retorna la lista de restaurantes administrados por un manager.
 *     tags:
 *       - Restaurants
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del manager.
 *     responses:
 *       200:
 *         description: Lista de restaurantes obtenida correctamente.
 *       404:
 *         description: No se encontraron restaurantes para este manager.
 */
router.get('/managers/:id/restaurants', getRestaurantsByManagerIdController);


export default router;
