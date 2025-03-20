import { injectable } from "inversify";
import User from "../models/User.model";
import { IUserManagementRepository } from "../interfaces/IUserManagementRepository";
import { IUser, IUserBase } from "@delatte/shared/interfaces";

@injectable()
export class UserManagementRepository implements IUserManagementRepository {
  async getUsers(role?: string): Promise<IUser[]> {
    const query = role ? { role } : {};
    return await User.find(query).select("-password").sort({ apellido: 1, nombre: 1 });
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  async suspendUser(userId: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
  }

  async deleteUser(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }

  async getUserDetails(userId: string): Promise<IUserBase | null> {
    return await User.findById(userId).lean();
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async verifyUserEmail(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, { emailToken: null, isVerified: true });
}

}
