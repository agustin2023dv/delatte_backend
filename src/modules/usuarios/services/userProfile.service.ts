import { inject, injectable } from "inversify";
import { IUser } from "@delatte/shared/interfaces";
import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";
import { USER_PROFILE_TYPES } from "../types/userProfile.types";
import { IUpdateUserProfileDTO } from "@delatte/shared/dtos";

@injectable()
export class UserProfileService {
  constructor(
    @inject(USER_PROFILE_TYPES.UserProfileRepository)
    private userProfileRepository: IUserProfileRepository
  ) {}

  async getUserData(userId: string) {
    const user = await this.userProfileRepository.getUserData(userId);
    if (!user) throw new Error("Usuario no encontrado");
    return user;
  }

  async updateUserData(userId: string, data: IUpdateUserProfileDTO) {
    return await this.userProfileRepository.updateUserData(userId, data);
  }

  async getUserByID(userId: string) {
    return await this.userProfileRepository.findUserById(userId);
  }

  async findUserByEmail(email: string) {
    return await this.userProfileRepository.findUserByEmail(email);
  }
}
