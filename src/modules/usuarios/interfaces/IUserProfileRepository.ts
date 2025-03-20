import { IUser, IUserBase } from "@delatte/shared/interfaces";

export interface IUserProfileRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserById(userId: string): Promise<IUser | null>;
  getUserData(userId: string): Promise<IUserBase | null>;
  updateUserData(userData: Partial<IUser>): Promise<IUser>;
}
