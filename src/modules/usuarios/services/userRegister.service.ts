import { inject, injectable } from "inversify";
import crypto from "crypto";
import { UserRegisterRepository } from "../repositories/userRegister.repository";
import { EmailService } from "../../integrations/services/email.service";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { IUserRegisterService } from "../interfaces/IUserRegisterService";
import { IUser } from "@delatte/shared/interfaces/User/IUser";

<<<<<<< Updated upstream
//* Servicio para CREAR usuario
export const registerUserService = async (nombre: string, apellido: string, email: string, hashedPassword: string) => {
  // Verificar si el usuario ya existe
  const existingUser = await UserRegisterRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error("El correo ya está en uso.");
  }

  // Crear el usuario utilizando el repositorio
  const newUser = await UserRegisterRepository.createUser({
    nombre,
    apellido,
    email,
    password: hashedPassword,
    emailToken: crypto.randomBytes(64).toString("hex"), 
    isVerified: false,
  });

  // 🔹 Validamos que `emailToken` no sea null antes de enviarlo
  await sendVerificationEmail(newUser.email, newUser.nombre, newUser.emailToken || "");

  return newUser;
};

//* Servicio para CREAR un MANAGER
export const registerManagerService = async (managerData: Partial<IUser>) => {
  if (!managerData.email || !managerData.nombre || !managerData.apellido || !managerData.password) {
    throw new Error("Faltan campos obligatorios para registrar al manager.");
  }

  // Verificar si el usuario ya existe
  const existingManager = await UserRegisterRepository.findUserByEmail(managerData.email);
  if (existingManager) {
    throw new Error("El email ya está en uso.");
  }

  // Crear el manager en la base de datos
  const newManager = await UserRegisterRepository.createUser({
    ...managerData,
    emailToken: crypto.randomBytes(64).toString("hex"),
    role: "manager",
  });

  // 🔹 Validamos que `emailToken` no sea null antes de enviarlo
  await sendVerificationEmail(newManager.email, newManager.nombre, newManager.emailToken || "");

  return newManager;
};

//* Función auxiliar para enviar email de verificación
const sendVerificationEmail = async (email: string, nombre: string, emailToken: string) => {
  if (!emailToken) {
    throw new Error("El token de verificación no puede ser null.");
  }

  const verificationLink = `http://localhost:8081/api/auth/verify-email?token=${emailToken}`;
  await sendEmailService({
    to: email,
    subject: "Verifica tu email",
    text: `Hola ${nombre},\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
    html: `<h1>Hola ${nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
  });
};
=======
@injectable()
export class UserRegisterService implements IUserRegisterService {
  constructor(
    @inject(USER_ACCESS_TYPES.UserRegisterRepository) private userRegisterRepository: UserRegisterRepository,
    @inject(USER_ACCESS_TYPES.EmailService) private emailService: EmailService,
    @inject(USER_ACCESS_TYPES.PasswordHasher) private passwordHasher: IPasswordHasher 
  ) {}

  async registerUser(nombre: string, apellido: string, email: string, password: string): Promise<IUser> {
    return await this.createUserWithRole(nombre, apellido, email, password, "customer");
  }

  async registerManager(managerData: { nombre: string; apellido: string; email: string; password: string }): Promise<IUser> {
    return await this.createUserWithRole(managerData.nombre, managerData.apellido, managerData.email, managerData.password, "manager");
  }

  private async createUserWithRole(nombre: string, apellido: string, email: string, password: string, role: "customer" | "manager" | "superadmin"): Promise<IUser> {
    const existingUser = await this.userRegisterRepository.findUserByEmail(email);
    if (existingUser) throw new Error("El correo ya está en uso.");

    const hashedPassword = await this.passwordHasher.hash(password); 

    const newUser = await this.userRegisterRepository.createUser({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      role,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });

    await this.emailService.sendVerificationEmail(newUser.nombre, newUser.email, newUser.emailToken || "");
    return newUser;
  }
}
>>>>>>> Stashed changes
