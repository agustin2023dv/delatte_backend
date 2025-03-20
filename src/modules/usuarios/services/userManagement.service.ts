<<<<<<< Updated upstream
import { UserManagementRepository } from "../repositories/userManagement.repository";

import { IUser } from "@delatte/shared/interfaces";

// 📌 Obtener usuarios con filtro opcional por rol
export const getUsersService = async (role?: string) => {
  return await UserManagementRepository.getUsers(role);
};

// 📌 Suspender usuario
export const suspendUserService = async (userId: string) => {
  return await   UserManagementRepository.suspendUser(userId);
};

// 📌 Eliminar usuario
export const deleteUserService = async (userId: string) => {
  return await  UserManagementRepository.deleteUser(userId);
};

// 📌 Obtener detalles de un usuario
export const getUserDetailsService = async (userId: string) => {
  return await UserManagementRepository.getUserDetails(userId);
};

// 📌 Actualizar usuario
export const updateUserService = async (userId: string, updateData: Partial<IUser>) => {
  return await  UserManagementRepository.updateUser(userId, updateData);
};

=======
import { inject, injectable } from "inversify";
import { IUserManagementRepository } from "../interfaces/IUserManagementRepository";
import { IUser, IUserBase } from "@delatte/shared/interfaces";
import { USER_MANAGEMENT_TYPES } from "../types/userManagement.types";

@injectable()
export class UserManagementService {
  constructor(
    @inject(USER_MANAGEMENT_TYPES.UserManagementRepository) 
    private userManagementRepository: IUserManagementRepository
  ) {}

  async getUsers(role?: string): Promise<IUser[]> {
    return await this.userManagementRepository.getUsers(role);
  }

  async suspendUser(userId: string): Promise<IUser | null> {
    return await this.userManagementRepository.suspendUser(userId);
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.userManagementRepository.deleteUser(userId);
  }

  async getUserDetails(userId: string): Promise<IUserBase | null> {
    return await this.userManagementRepository.getUserDetails(userId);
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await this.userManagementRepository.updateUser(userId, updateData);
  }
}
>>>>>>> Stashed changes
