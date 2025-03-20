import { inject, injectable } from "inversify";
import { IUser, IUserBase } from "@delatte/shared/interfaces";
import { USER_PROFILE_TYPES } from "../types/userProfile.types";
import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";

<<<<<<< Updated upstream
// 📌 Obtener datos del usuario
export const getUserDataService = async (userId: string) => {
  const user = await UserProfileRepository.getUserData(userId);
  if (!user) throw new Error("Usuario no encontrado");
  return user as IUser;
};

// 📌 Actualizar perfil del usuario
export const updateUserDataService = async (userData: Partial<IUser>) => {
  return await UserProfileRepository.updateUserData(userData);
};

// 📌 Buscar usuario por ID
export const getUserByIDService = async (userId: string) => {
  return await UserProfileRepository.findUserById(userId);
};

// 📌 Buscar usuario por email
export const findUserByEmailService = async (email: string) => {
  return await UserProfileRepository.findUserByEmail(email);
};
=======
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
>>>>>>> Stashed changes
