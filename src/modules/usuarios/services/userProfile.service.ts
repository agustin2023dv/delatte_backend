import { inject, injectable } from "inversify";
import { IUser, IUserBase } from "@delatte/shared/interfaces";
import { USER_PROFILE_TYPES } from "../types/userProfile.types";
import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";

@injectable()
export class UserProfileService {
  constructor(
    @inject(USER_PROFILE_TYPES.UserProfileRepository)
    private userProfileRepository: IUserProfileRepository
  ) {}

  // 📌 Obtener datos del usuario
  async getUserData(userId: string): Promise<IUserBase> {
    const user = await this.userProfileRepository.getUserData(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  // 📌 Actualizar perfil del usuario
  async updateUserData(userData: Partial<IUser>) {
    return await this.userProfileRepository.updateUserData(userData);
  }

  // 📌 Buscar usuario por ID
  async getUserByID(userId: string) {
    return await this.userProfileRepository.findUserById(userId);
  }

  // 📌 Buscar usuario por email
  async findUserByEmail(email: string) {
    return await this.userProfileRepository.findUserByEmail(email);
  }
}
