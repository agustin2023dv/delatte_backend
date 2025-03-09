import crypto from "crypto";
import { UserRegisterRepository } from "../repositories/userRegister.repository";
import { sendEmailService } from "../../integrations/services/email.service";
import { IUser } from "@delatte/shared/interfaces/IUser";

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
