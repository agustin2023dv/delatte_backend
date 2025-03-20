import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";
import { IUser, IUserBase } from "@delatte/shared/interfaces";
import User from "../models/User.model";
import { Types } from "mongoose";
import { injectable } from "inversify";

@injectable()
export class UserProfileRepository implements IUserProfileRepository {
  // 📌 Buscar usuario por email
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  // 📌 Buscar usuario por ID
  async findUserById(userId: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(userId)) throw new Error("ID de usuario no válido");
    return await User.findById(userId);
  }

  // 📌 Obtener datos del usuario (sin datos sensibles)
  async getUserData(userId: string): Promise<IUserBase | null> {
    if (!Types.ObjectId.isValid(userId)) throw new Error("ID de usuario no válido");
    return await User.findById(userId).lean();
  }

  // 📌 Actualizar datos del usuario
  async updateUserData(userData: Partial<IUser>): Promise<IUser> {
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
