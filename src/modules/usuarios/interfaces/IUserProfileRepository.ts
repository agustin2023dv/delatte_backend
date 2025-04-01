import { IUser } from "@delatte/shared/interfaces";
import { IUpdateUserProfileDTO } from "@delatte/shared/dtos";

export interface IUserProfileRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserById(userId: string): Promise<IUser | null>;
  getUserData(userId: string): Promise<IUser["profile"] | null>; 
  updateUserData(userId: string, userData: IUpdateUserProfileDTO): Promise<IUser>;
}