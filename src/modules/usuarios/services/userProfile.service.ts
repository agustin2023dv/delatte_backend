import { UserProfileRepository } from "../repositories/userProfile.repository";
import { IUser } from "@delatte/shared/interfaces";

// 📌 Obtener datos del usuario
export const getUserDataService = async (userId: string) => {
  const user = await UserProfileRepository.getUserData(userId);
  if (!user) throw new Error("Usuario no encontrado");
  return user as IUser;
};

// 📌 Actualizar perfil del usuario
export const updateUserDataService = async (userData: Partial<IUser>) => {
  return await UserProfileRepository.updateUserData(userData);
};

// 📌 Buscar usuario por ID
export const getUserByIDService = async (userId: string) => {
  return await UserProfileRepository.findUserById(userId);
};

// 📌 Buscar usuario por email
export const findUserByEmailService = async (email: string) => {
  return await UserProfileRepository.findUserByEmail(email);
};
