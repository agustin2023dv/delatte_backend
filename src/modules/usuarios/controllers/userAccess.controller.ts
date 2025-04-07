import { controller, httpPost } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { UserLoginService } from "../services/userLogin.service";
import { UserRegisterService } from "../services/userRegister.service";
import { loginRateLimiter } from "../../../middlewares/rateLimiter.middlware";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { ICustomerRegistrationDTO } from "@delatte/shared/dtos";

@controller("/api/v1")
export class UserAccessController {
  constructor(
    @inject(USER_ACCESS_TYPES.UserRegisterService) private userRegisterService: UserRegisterService,
    @inject(USER_ACCESS_TYPES.UserLoginService) private userLoginService: UserLoginService,
  ) {}

  @httpPost("/auth", loginRateLimiter)
  async loginCustomer(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.userLoginService.loginCustomer(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
    }
  }

  @httpPost("/auth/manager", loginRateLimiter)
  async loginManager(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, user } = await this.userLoginService.loginManager(email, password);
      res.status(200).json({ token, user });
    } catch (error) {
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
    }
  }

  @httpPost("/auth/google")
async loginOrRegisterWithGoogle(req: Request, res: Response): Promise<void> {
  try {
    const { accessToken } = req.body;

    const { token, user } = await this.userLoginService.loginOrRegisterWithGoogle(accessToken);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Error en autenticación con Google",
    });
  }
}


  
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
      res.status(400).json({ message: error instanceof Error ? error.message : "Error al registrar el usuario" });
    }
  }
}
