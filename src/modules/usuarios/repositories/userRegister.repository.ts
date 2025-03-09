import User from "../models/User.model";
import { IUser } from "@delatte/shared/interfaces";

export class UserRegisterRepository {
  // 📌 Buscar usuario por email
  static async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  // 📌 Crear un nuevo usuario (customer o manager)
  static async createUser(userData: Partial<IUser>): Promise<IUser> {
    const newUser = new User({
      ...userData,
      emailToken: userData.emailToken || "", 
    });

    return await newUser.save();
  }
}
