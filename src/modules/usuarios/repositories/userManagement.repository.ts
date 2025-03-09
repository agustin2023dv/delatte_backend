import User from "../models/User.model";
import mongoose from "mongoose";
import { IUser } from "@delatte/shared/interfaces";

export class UserManagementRepository {

  // 📌 Obtener usuarios con filtro por rol opcional
  static async getUsers(role?: string) {
    const query = role ? { role } : {}; 
    return await User.find(query)
      .select("-password")
      .sort({ apellido: 1, nombre: 1 });
  }

  // 📌 Buscar usuario por ID
  static async getUserById(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("ID de usuario no válido");
    }
    return await User.findById(userId);
  }

  // 📌 Suspender usuario
  static async suspendUser(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("ID de usuario no válido");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (!user.isActive) {
      throw new Error("El usuario ya está suspendido");
    }

    return await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
  }

  // 📌 Eliminar usuario (validación de superadmin)
  static async deleteUser(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("ID de usuario no válido");
    }

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("Usuario no encontrado");
    }

    if (user.role === "superadmin") {
      throw new Error("No se puede eliminar un superadmin");
    }

    return await User.findByIdAndDelete(userId);
  }

  // 📌 Obtener detalles de un usuario
  static async getUserDetails(userId: string) {
    return await this.getUserById(userId);
  }

  // 📌 Actualizar usuario
  static async updateUser(userId: string, updateData: Partial<IUser>) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("ID de usuario no válido");
    }

    // Evitar que `emailToken` sea modificado
    const { emailToken, password, ...filteredUpdateData } = updateData;

    return await User.findByIdAndUpdate(userId, filteredUpdateData, { new: true }).select("-emailToken");
  }

  // 📌 Buscar usuario por email (para login)
  static async getUserByEmail(email: string) {
    return await User.findOne({ email });
  }
}
