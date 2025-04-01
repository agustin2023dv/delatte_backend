import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";
import { IUser, IUserBase } from "@delatte/shared/interfaces";
import { IUpdateUserProfileDTO } from "@delatte/shared/dtos";
import User from "../models/User.model";
import { Types } from "mongoose";
import { injectable } from "inversify";

@injectable()
export class UserProfileRepository implements IUserProfileRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ "profile.email": email });
  }

  async findUserById(userId: string): Promise<IUser | null> {
    if (!Types.ObjectId.isValid(userId)) throw new Error("ID de usuario no válido");
    return await User.findById(userId);
  }

  async getUserData(userId: string): Promise<IUserBase | null> {
    if (!Types.ObjectId.isValid(userId)) throw new Error("ID de usuario no válido");
    const user = await User.findById(userId).select("profile").lean();
    return user?.profile ?? null;
  }

  async updateUserData(userId: string, userData: IUpdateUserProfileDTO): Promise<IUser> {
    const updates: any = {};

    if (userData.phone) updates["profile.phone"] = userData.phone;
    if (userData.profileImage) updates["profile.profileImage"] = userData.profileImage;
    if (userData.addresses) updates["profile.addresses"] = userData.addresses;
    if (userData.email) updates["profile.email"] = userData.email;

    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.profile.dob && userData.dob) {
      updates["profile.dob"] = userData.dob;
    }

    return await User.findByIdAndUpdate(userId, updates, { new: true }) as IUser;
  }
}
