import { controller, httpPost } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { UserLoginService } from "../services/userLogin.service";
import { UserRegisterService } from "../services/userRegister.service";
import { loginRateLimiter } from "../../../middlewares/rateLimiter.middlware";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { ICustomerRegistrationDTO, ILoginDTO } from "@delatte/shared/dtos";

@controller("/api/v1")
export class UserAccessController {
  constructor(
    @inject(USER_ACCESS_TYPES.UserRegisterService)
    private userRegisterService: UserRegisterService,

    @inject(USER_ACCESS_TYPES.UserLoginService)
    private userLoginService: UserLoginService
  ) {}

  /**
   * 🔑 Login tradicional como cliente
   * POST /auth
   */
  @httpPost("/auth", loginRateLimiter)
  async loginCustomer(req: Request, res: Response): Promise<void> {
    try {
      const credentials: ILoginDTO = req.body;
      console.log("🔐 [LOGIN CUSTOMER] Credenciales recibidas:", credentials);

      const { token, user } = await this.userLoginService.loginCustomer(
        credentials.email,
        credentials.password
      );

      console.log("✅ [LOGIN CUSTOMER] Login exitoso:", {
        userId: user._id,
        email: user.profile.email,
        role: user.role,
      });

      res.status(200).json({ token, user });
    } catch (error) {
      console.error("❌ [LOGIN CUSTOMER] Error:", error);
      res.status(400).json({
        message:
          error instanceof Error ? error.message : "Error al iniciar sesión",
      });
    }
  }

  /**
   * 🔑 Login tradicional como manager
   * POST /auth/manager
   */
  @httpPost("/auth/manager", loginRateLimiter)
  async loginManager(req: Request, res: Response): Promise<void> {
    try {
      const credentials: ILoginDTO = req.body;
      console.log("🔐 [LOGIN MANAGER] Credenciales recibidas:", credentials);

      const { token, user } = await this.userLoginService.loginManager(
        credentials.email,
        credentials.password
      );

      console.log("✅ [LOGIN MANAGER] Login exitoso:", {
        userId: user._id,
        email: user.profile.email,
        role: user.role,
      });

      res.status(200).json({ token, user });
    } catch (error) {
      console.error("❌ [LOGIN MANAGER] Error:", error);
      res.status(400).json({
        message:
          error instanceof Error ? error.message : "Error al iniciar sesión",
      });
    }
  }

  /**
   * 🔐 Login con cuenta de Google previamente registrada
   * POST /auth/google/login
   */
  @httpPost("/auth/google/login")
  async loginWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      const { accessToken } = req.body;
      const { token, user } = await this.userLoginService.loginWithGoogle(accessToken);
      res.status(200).json({ token, user });
      console.log("todo ok");
    } catch (error) {
      console.error("❌ Error loginWithGoogle:", error);
      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Error al iniciar sesión con Google",
      });
    }
  }

  /**
   * 🆕 Registro de nuevo usuario con cuenta de Google
   * POST /auth/google/register
   */
  @httpPost("/auth/google/register")
  async registerWithGoogle(req: Request, res: Response): Promise<void> {
    try {
      const { accessToken } = req.body;
      const newUser = await this.userRegisterService.registerWithGoogle(accessToken);
      res.status(201).json({
        message: "Usuario registrado correctamente con Google",
        user: newUser,
      });
    } catch (error) {
      console.error("❌ Error registerWithGoogle:", error);
      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Error al registrar usuario con Google",
      });
    }
  }

  /**
   * 📝 Registro tradicional como cliente
   * POST /users
   */
  @httpPost("/users")
  async registrarUsuario(req: Request, res: Response): Promise<void> {
    try {
      const userData: ICustomerRegistrationDTO = req.body;
      const newUser = await this.userRegisterService.registerUser(userData);
      res.status(201).json({
        message: "Usuario registrado con éxito. Por favor verifica tu email.",
        user: newUser,
      });
    } catch (error) {
      console.error("[REGISTER ERROR]", error);
      res.status(400).json({
        message:
          error instanceof Error
            ? error.message
            : "Error al registrar el usuario",
      });
    }
  }
}
