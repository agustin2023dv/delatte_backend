import express from 'express';
import {
  getUserByIDController,
  getUserProfileController,
  updateUserDataController,
} from '../controllers/userProfile.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/profile:
 *   get:
 *     summary: Obtener perfil del usuario autenticado
 *     description: Devuelve la información del usuario actualmente autenticado.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: "65c1f0d234b6a10f12345678"
 *                 nombre:
 *                   type: string
 *                   example: "Juan"
 *                 apellido:
 *                   type: string
 *                   example: "Pérez"
 *                 email:
 *                   type: string
 *                   example: "juanperez@example.com"
 *                 phone:
 *                   type: string
 *                   example: "+5491122334455"
 *                 role:
 *                   type: string
 *                   enum: ["customer", "manager", "superadmin"]
 *                   example: "customer"
 *       401:
 *         description: Usuario no autenticado.
 */
router.get('/', authMiddleware, getUserProfileController);

/**
 * @swagger
 * /api/v1/profile:
 *   put:
 *     summary: Actualizar perfil del usuario autenticado
 *     description: Permite actualizar datos del usuario autenticado, como nombre, email o teléfono.
 *     tags:
 *       - Profile
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
 *                 example: "Juan"
 *               apellido:
 *                 type: string
 *                 example: "Pérez"
 *               phone:
 *                 type: string
 *                 example: "+5491122334455"
 *     responses:
 *       200:
 *         description: Perfil actualizado con éxito.
 *       400:
 *         description: Datos inválidos proporcionados.
 *       401:
 *         description: Usuario no autenticado.
 */
router.put('/', authMiddleware, updateUserDataController);

/**
 * @swagger
 * /api/v1/profile/{id}:
 *   get:
 *     summary: Obtener información de un usuario por ID
 *     description: Devuelve la información de un usuario en específico según su ID. Solo disponible para superadmins.
 *     tags:
 *       - Profile
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a consultar.
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos correctamente.
 *       400:
 *         description: ID inválido.
 *       401:
 *         description: Usuario no autenticado.
 *       404:
 *         description: Usuario no encontrado.
 */
router.get('/:id', authMiddleware, getUserByIDController);

export default router;
