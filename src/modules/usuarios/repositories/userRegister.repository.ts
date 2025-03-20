import { injectable } from "inversify";
import User from "../models/User.model";
import { IUser } from "@delatte/shared/interfaces";

@injectable()
export class UserRegisterRepository {
  async findUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async createUser(userData: Partial<IUser>): Promise<IUser> {
    const newUser = new User({
      ...userData,
      emailToken: userData.emailToken || "",
    });
    return await newUser.save();
  }
}
