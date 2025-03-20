import { IUser, IUserBase } from "@delatte/shared/interfaces";

export interface IUserManagementRepository {
  getUsers(role?: string): Promise<IUser[]>;
  getUserById(userId: string): Promise<IUser | null>;
  suspendUser(userId: string): Promise<IUser | null>;
  deleteUser(userId: string): Promise<void>;
  getUserDetails(userId: string): Promise<IUserBase | null>;
  updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null>;
  verifyUserEmail(userId: string): Promise<void>;

}
