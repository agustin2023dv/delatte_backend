import { injectable } from "inversify";
import User from "../models/User.model";

@injectable()
export class BaseUserRepository {
  async findUserById(userId: string) {
    return await User.findById(userId);
  }
}
