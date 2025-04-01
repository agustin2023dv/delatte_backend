import { injectable } from "inversify";
import User from "../models/User.model";
import { IUser } from "@delatte/shared/interfaces";
import { HydratedDocument } from "mongoose";
import { IUserBase } from "@delatte/shared/interfaces/User/IUserBase";
import { IUserSecurity } from "@delatte/shared/interfaces/User/IUserSecurity";
import { IUserRole } from "@delatte/shared/interfaces/User/IUserRole";

type CreateUserData = {
  profile: IUserBase;
  security: Pick<IUserSecurity, "password" | "emailToken" | "isVerified">;
  role: IUserRole["role"];
};

@injectable()
export class UserRegisterRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ "profile.email": email });
  }

  async createUser(userData: CreateUserData): Promise<IUser> {
    const newUser: HydratedDocument<IUser> = new User({
      profile: userData.profile,
      security: {
        ...userData.security,
        isActive: true, 
      },
      role: userData.role,
    });

    return await newUser.save();
  }
}
