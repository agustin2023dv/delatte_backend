import { injectable } from "inversify";
import User from "../models/User.model";
import { IUserAuthRepository } from "../interfaces/IUserAuthRepository";
import { IUser } from "@delatte/shared/interfaces";

@injectable()
export class UserAuthRepository implements IUserAuthRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async findUserByEmailToken(emailToken: string): Promise<IUser | null> {
    return await User.findOne({ emailToken });
  }

  async getUserByEmailAndRole(email: string, role: string): Promise<IUser> {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Usuario no encontrado");
    if (user.role !== role) throw new Error("El usuario no tiene permisos para iniciar sesión");
    return user;
  }

  async updateUserPassword(userId: string, hashedPassword: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { password: hashedPassword });
  }
}
