import bcrypt from "bcrypt";
import { injectable } from "inversify";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";

const saltRounds = 10;

@injectable()
export class PasswordHasher implements IPasswordHasher {
  async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
