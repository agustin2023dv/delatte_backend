import express from 'express';
import {
  loginCustomerController,
  loginManagerController,
  registrarUsuarioController,
  verificarEmailController,
  cambiarContrasenaController,
  requestPasswordResetController,
  resetPasswordController,
} from '../controllers/usuario.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { loginRateLimiter } from '../../../middlewares/rateLimiter.middlware';

const router = express.Router();

/**
 * @swagger
 * /api/v1/users:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     description: Permite a un usuario registrarse en la plataforma.
 *     tags:
 *       - Users
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
 *               email:
 *                 type: string
 *                 example: "juan@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePass123!"
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado con éxito"
 *                 userId:
 *                   type: string
 */
router.post('/users', registrarUsuarioController);

/**
 * @swagger
 * /api/v1/users/email-verification:
 *   post:
 *     summary: Verificación de correo electrónico
 *     description: Verifica la dirección de correo electrónico de un usuario mediante un token.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: query
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de verificación enviado por correo electrónico
 *     responses:
 *       200:
 *         description: Correo verificado con éxito
 *       400:
 *         description: Token inválido o expirado
 */
router.post('/users/email-verification', verificarEmailController);

/**
 * @swagger
 * /api/v1/auth:
 *   post:
 *     summary: Inicio de sesión para clientes
 *     description: Permite a los clientes autenticarse en la plataforma.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "cliente@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePass123!"
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
router.post('/auth', loginRateLimiter, loginCustomerController);

/**
 * @swagger
 * /api/v1/auth/manager:
 *   post:
 *     summary: Inicio de sesión para managers
 *     description: Permite a los managers autenticarse en la plataforma.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "manager@example.com"
 *               password:
 *                 type: string
 *                 example: "SecurePass123!"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/auth/manager', loginRateLimiter, loginManagerController);

/**
 * @swagger
 * /api/v1/users/password:
 *   put:
 *     summary: Cambiar contraseña de usuario autenticado
 *     description: Permite a un usuario cambiar su contraseña actual.
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: "OldPass123!"
 *               newPassword:
 *                 type: string
 *                 example: "NewSecurePass456!"
 *     responses:
 *       200:
 *         description: Contraseña actualizada con éxito
 *       400:
 *         description: La contraseña actual es incorrecta
 */
router.put('/users/password', authMiddleware, cambiarContrasenaController);

/**
 * @swagger
 * /api/v1/users/password-reset-requests:
 *   post:
 *     summary: Solicitar restablecimiento de contraseña
 *     description: Envia un correo con instrucciones para restablecer la contraseña.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "usuario@example.com"
 *     responses:
 *       200:
 *         description: Correo de restablecimiento enviado
 *       404:
 *         description: Usuario no encontrado
 */
router.post('/users/password-reset-requests', requestPasswordResetController);

/**
 * @swagger
 * /api/v1/users/password-resets:
 *   post:
 *     summary: Restablecer contraseña con token
 *     description: Permite al usuario establecer una nueva contraseña usando un token de recuperación.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "abcd1234"
 *               newPassword:
 *                 type: string
 *                 example: "NewSecurePass789!"
 *     responses:
 *       200:
 *         description: Contraseña restablecida con éxito
 *       400:
 *         description: Token inválido o expirado
 */
router.post('/users/password-resets', resetPasswordController);

export default router;
