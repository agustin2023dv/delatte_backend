import { UserManagementRepository } from "../repositories/userManagement.repository";
import { IUser } from "@delatte/shared/interfaces";

export class UserManagementService {
  
  // 📌 Obtener usuarios con filtro opcional por rol
  static async getUsers(role?: string) {
    return await UserManagementRepository.getUsers(role);
  }

  // 📌 Suspender usuario
  static async suspendUser(userId: string) {
    return await UserManagementRepository.suspendUser(userId);
  }

  // 📌 Eliminar usuario
  static async deleteUser(userId: string) {
    return await UserManagementRepository.deleteUser(userId);
  }

  // 📌 Obtener detalles de un usuario
  static async getUserDetails(userId: string) {
    return await UserManagementRepository.getUserDetails(userId);
  }

  // 📌 Actualizar usuario
  static async updateUser(userId: string, updateData: Partial<IUser>) {
    return await UserManagementRepository.updateUser(userId, updateData);
  }
}
