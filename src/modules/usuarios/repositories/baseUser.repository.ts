import User from "../models/User.model";
import mongoose from "mongoose";

export class BaseUserRepository {
  // 📌 Buscar usuario por ID (Evita duplicación en otros repos)
  static async findUserById(userId: string) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new Error("ID de usuario no válido");
    }
    return await User.findById(userId);
  }
}
