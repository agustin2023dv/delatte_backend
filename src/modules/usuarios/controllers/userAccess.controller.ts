import { Response } from "express";
import { AuthRequest } from "../../../../types";
import { loginCustomerService, loginManagerService, loginAdminService } from "../services/userLogin.service"; 

import { hashPasswordService } from "../services/userAuth.service";
import { registerUserService } from "../services/userRegister.service";
import { sendEmailService } from "../../integrations/services/email.service";

//** Controlador para registrar un nuevo usuario **
export const registrarUsuarioController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { nombre, apellido, email, password } = req.body;

    const hashedPassword = await hashPasswordService(password);
    const newUser = await registerUserService(nombre, apellido, email, hashedPassword);

    const verificationLink = `http://localhost:8081/api/auth/verify-email?token=${newUser.emailToken}`;
    await sendEmailService({
      to: email,
      subject: "Verifica tu email",
      text: `Hola ${nombre}, por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
      html: `<h1>Hola ${nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
    });

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
    const { token, user } = await loginCustomerService(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
  }
};

//** Controlador para iniciar sesión como MANAGER **
export const loginManagerController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginManagerService(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
  }
};

//** Controlador para iniciar sesión como ADMIN (Superadmin) **
export const loginAdminController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const { token, user } = await loginAdminService(email, password);
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
  }
};
