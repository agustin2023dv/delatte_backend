import express from "express";
import { loginRateLimiter } from "../../../middlewares/rateLimiter.middlware";

import { loginCustomerController, loginManagerController, registrarUsuarioController } from "../controllers/userAccess.controller";


const router = express.Router();


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


export default router;
