import express from "express";
import { 
  getUsersController, 
  suspendUserController, 
  deleteUserController, 
  updateUserController, 
  getUserDetailsController,
  loginAdminController
} from "../controllers/admin.controller";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import { loginRateLimiter } from "../../../middlewares/rateLimiter.middlware";

const router = express.Router();

/**
 * @swagger
 * /api/v1/admin/auth:
 *   post:
 *     summary: Inicio de sesión para administradores
 *     description: Permite a los superadmins iniciar sesión en el panel de administración.
 *     tags:
 *       - Admin
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     nombre:
 *                       type: string
 *                     rol:
 *                       type: string
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/auth', loginRateLimiter, loginAdminController);

/**
 * @swagger
 * /api/v1/admin/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     description: Devuelve la lista de usuarios registrados. Solo accesible por superadmins.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                   nombre:
 *                     type: string
 *                   email:
 *                     type: string
 *                   estado:
 *                     type: string
 *                   rol:
 *                     type: string
 *       403:
 *         description: No autorizado
 */
router.get('/users', authMiddleware, roleMiddleware(["superadmin"]), getUsersController);

/**
 * @swagger
 * /api/v1/admin/users/{id}/suspension:
 *   patch:
 *     summary: Suspender un usuario
 *     description: Permite a los superadmins suspender a un usuario.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a suspender
 *     responses:
 *       200:
 *         description: Usuario suspendido con éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.patch('/users/:id/suspension', authMiddleware, roleMiddleware(["superadmin"]), suspendUserController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     description: Permite a los superadmins eliminar un usuario de la plataforma.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado con éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.delete('/users/:id', authMiddleware, roleMiddleware(["superadmin"]), deleteUserController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   get:
 *     summary: Obtener detalles de un usuario
 *     description: Devuelve los detalles de un usuario en particular.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a consultar
 *     responses:
 *       200:
 *         description: Datos del usuario obtenidos correctamente
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/users/:id', authMiddleware, getUserDetailsController);

/**
 * @swagger
 * /api/v1/admin/users/{id}:
 *   put:
 *     summary: Actualizar datos de un usuario
 *     description: Permite a los superadmins modificar la información de un usuario.
 *     tags:
 *       - Admin
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               email:
 *                 type: string
 *               rol:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado con éxito
 *       404:
 *         description: Usuario no encontrado
 */
router.put('/users/:id', authMiddleware, roleMiddleware(["superadmin"]), updateUserController);

export default router;
