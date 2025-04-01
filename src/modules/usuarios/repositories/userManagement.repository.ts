import { injectable } from "inversify";
import User from "../models/User.model";
import { IUserManagementRepository } from "../interfaces/IUserManagementRepository";
import { IUser, IUserBase } from "@delatte/shared/interfaces";
import { IAdminUpdateUserDTO } from "@delatte/shared/dtos";
import { Types } from "mongoose";

@injectable()
export class UserManagementRepository implements IUserManagementRepository {
  async getUsers(role?: string): Promise<IUser[]> {
    const query = role ? { role } : {};
    return await User.find(query)
      .select("-security.password")
      .sort({ "profile.apellido": 1, "profile.nombre": 1 });
  }

  async getUserById(userId: string): Promise<IUser | null> {
    return await User.findById(userId);
  }

  async suspendUser(userId: string): Promise<IUser | null> {
    return await User.findByIdAndUpdate(
      userId,
      { "security.isActive": false },
      { new: true }
    );
  }

  async deleteUser(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }

  async getUserDetails(userId: string): Promise<IUserBase | null> {
    const user = await User.findById(userId)
      .select("profile")
      .lean<IUser>();
    return user?.profile ?? null;
  }

  async updateUser(userId: string, updateData: IAdminUpdateUserDTO): Promise<IUser | null> {
    const updates: any = {};

    if (updateData.nombre) updates["profile.nombre"] = updateData.nombre;
    if (updateData.apellido) updates["profile.apellido"] = updateData.apellido;
    if (updateData.email) updates["profile.email"] = updateData.email;
    if (updateData.phone) updates["profile.phone"] = updateData.phone;
    if (updateData.dob) updates["profile.dob"] = new Date(updateData.dob);
    if (updateData.addresses) updates["profile.addresses"] = updateData.addresses;
    if (updateData.profileImage) updates["profile.profileImage"] = updateData.profileImage;

    if (updateData.isVerified !== undefined)
      updates["security.isVerified"] = updateData.isVerified;

    if (updateData.isActive !== undefined)
      updates["security.isActive"] = updateData.isActive;

    if (updateData.role) updates["role"] = updateData.role;

    return await User.findByIdAndUpdate(userId, updates, { new: true });
  }

  async verifyUserEmail(userId: string): Promise<void> {
    await User.findByIdAndUpdate(userId, {
      "security.emailToken": null,
      "security.isVerified": true,
    });
  }
}
