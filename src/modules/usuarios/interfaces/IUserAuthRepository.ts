import { IUser } from "@delatte/shared/interfaces";

export interface IUserAuthRepository {
  findUserByEmail(email: string): Promise<IUser | null>;
  findUserByEmailToken(emailToken: string): Promise<IUser | null>;
  getUserByEmailAndRole(email: string, role: string): Promise<IUser>;
  updateUserPassword(userId: string, hashedPassword: string): Promise<void>;
}
