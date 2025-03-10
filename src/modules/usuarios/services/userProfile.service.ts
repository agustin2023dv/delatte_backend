import { UserProfileRepository } from "../repositories/userProfile.repository";
import { IUser } from "@delatte/shared/interfaces";

export class UserProfileService {
  
  // 📌 Obtener datos del usuario
  static async getUserData(userId: string) {
    const user = await UserProfileRepository.getUserData(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user as IUser;
  }

  // 📌 Actualizar perfil del usuario
  static async updateUserData(userData: Partial<IUser>) {
    return await UserProfileRepository.updateUserData(userData);
  }

  // 📌 Buscar usuario por ID
  static async getUserByID(userId: string) {
    return await UserProfileRepository.findUserById(userId);
  }

  // 📌 Buscar usuario por email
  static async findUserByEmail(email: string) {
    return await UserProfileRepository.findUserByEmail(email);
  }
}
