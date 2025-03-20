import { inject, injectable } from "inversify";
import { IUserManagementRepository } from "../interfaces/IUserManagementRepository";
import { IUser, IUserBase } from "@delatte/shared/interfaces";
import { USER_MANAGEMENT_TYPES } from "../types/userManagement.types";

@injectable()
export class UserManagementService {
  constructor(
    @inject(USER_MANAGEMENT_TYPES.UserManagementRepository) 
    private userManagementRepository: IUserManagementRepository
  ) {}

  async getUsers(role?: string): Promise<IUser[]> {
    return await this.userManagementRepository.getUsers(role);
  }

  async suspendUser(userId: string): Promise<IUser | null> {
    return await this.userManagementRepository.suspendUser(userId);
  }

  async deleteUser(userId: string): Promise<void> {
    return await this.userManagementRepository.deleteUser(userId);
  }

  async getUserDetails(userId: string): Promise<IUserBase | null> {
    return await this.userManagementRepository.getUserDetails(userId);
  }

  async updateUser(userId: string, updateData: Partial<IUser>): Promise<IUser | null> {
    return await this.userManagementRepository.updateUser(userId, updateData);
  }
}
