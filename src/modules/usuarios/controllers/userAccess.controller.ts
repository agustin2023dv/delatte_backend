import { Response } from "express";
import { AuthRequest } from "../../../../types";
import { UserLoginService } from "../services/userLogin.service";
import { UserRegisterService } from "../services/userRegister.service";
import { UserAuthService } from "../services/userAuth.service";

//** Controlador para registrar un nuevo usuario **
export const registrarUsuarioController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { nombre, apellido, email, password } = req.body;

    const hashedPassword = await UserAuthService.hashPassword(password);
    const newUser = await UserRegisterService.registerUser(nombre, apellido, email, hashedPassword);

    res.status(201).json({ message: "Usuario registrado con éxito. Por favor verifica tu email.", user: newUser });
  } catch (error) {
    console.error("Error en registrarUsuarioController:", error);
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al registrar el usuario" });
  }
};

//** Controlador para iniciar sesión como CUSTOMER **
export const loginCustomerController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserLoginService.loginCustomer(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
  }
};

//** Controlador para iniciar sesión como MANAGER **
export const loginManagerController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserLoginService.loginManager(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
  }
};

//** Controlador para iniciar sesión como ADMIN (Superadmin) **
export const loginAdminController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await UserLoginService.loginAdmin(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
  }
};
