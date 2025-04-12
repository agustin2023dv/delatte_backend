// ✅ src/modules/users/repositories/userAuth.repository.ts

import { injectable } from "inversify";
import User from "../models/User.model";
import { IUserAuthRepository } from "../interfaces/IUserAuthRepository";
import { IUser } from "@delatte/shared/interfaces";

@injectable()
export class UserAuthRepository implements IUserAuthRepository {
  /**
   * Busca un usuario por su email (dentro del subdocumento profile).
   */
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ "profile.email": email });
  }

  /**
   * Busca un usuario por el token de verificación de email (dentro de security).
   */
  async findUserByEmailToken(emailToken: string): Promise<IUser | null> {
    return await User.findOne({ "security.emailToken": emailToken });
  }

  /**
   * Busca un usuario por su email y rol. Lanza error si no existe o el rol no coincide.
   */
  async getUserByEmailAndRole(email: string, role: string): Promise<IUser> {
    const user = await User.findOne({ "profile.email": email, role });
    if (!user) throw new Error("Usuario no encontrado o rol inválido");
    return user;
  }

  /**
   * Actualiza la contraseña de un usuario.
   */
  async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      "security.password": hashedPassword,
    });
  }
}
