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

