import User from "../models/User.model";
import { Types } from "mongoose";
import { IUser } from "@delatte/shared/interfaces";

export class UserProfileRepository {
  
  // 📌 Buscar usuario por email
  static async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  // 📌 Buscar usuario por ID
  static async findUserById(userId: string) {
    if (!Types.ObjectId.isValid(userId)) throw new Error("ID de usuario no válido");
    return await User.findById(userId);
  }

  // 📌 Obtener datos del usuario (sin datos sensibles)
  static async getUserData(userId: string) {
    if (!Types.ObjectId.isValid(userId)) throw new Error("ID de usuario no válido");
    return await User.findById(userId).select("-password -emailToken -isVerified").lean();
  }

  // 📌 Actualizar datos del usuario
  static async updateUserData(userData: Partial<IUser>) {
    const user = await User.findOne({ email: userData.email });
    if (!user) throw new Error("Usuario no encontrado");

    user.phone = userData.phone || user.phone;
    user.addresses = userData.addresses || user.addresses;
    user.profileImage = userData.profileImage || user.profileImage;

    // La fecha de nacimiento solo puede modificarse una vez
    if (!user.dob && userData.dob) {
      user.dob = userData.dob;
    }

    return await user.save();
  }
}
