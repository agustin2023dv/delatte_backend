import { controller, httpPost } from "inversify-express-utils";
import { Response } from "express";
import { inject } from "inversify";
import { AuthRequest } from "../../../../types";
import { UserLoginService } from "../services/userLogin.service";
import { UserRegisterService } from "../services/userRegister.service";
import { loginRateLimiter } from "../../../middlewares/rateLimiter.middlware";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";

@controller("/api/v1")
export class UserAccessController {
  constructor(
    @inject(USER_ACCESS_TYPES.UserRegisterService) private userRegisterService: UserRegisterService,
    @inject(USER_ACCESS_TYPES.UserLoginService) private userLoginService: UserLoginService,
  ) {}

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
   */
  @httpPost("/auth", loginRateLimiter)
  async loginCustomer(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.userLoginService.loginCustomer(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
    }
  }

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
   */
  @httpPost("/auth/manager", loginRateLimiter)
  async loginManager(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.userLoginService.loginManager(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
    }
  }

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
   */
  @httpPost("/users")
  async registrarUsuario(req: AuthRequest, res: Response): Promise<void> {
    try {
      const { nombre, apellido, email, password } = req.body;
      const newUser = await this.userRegisterService.registerUser(nombre, apellido, email,
         password); 
  
      res.status(201).json({
        message: "Usuario registrado con éxito. Por favor verifica tu email.",
        user: newUser,
      });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al registrar el usuario" });
    }
  }
  
  
}
