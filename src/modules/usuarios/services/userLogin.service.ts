import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserAuthRepository } from "../repositories/userAuth.repository";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";

@injectable()
export class UserLoginService {
  constructor(
    @inject(USER_ACCESS_TYPES.UserAuthRepository)
    private userAuthRepository: UserAuthRepository
  ) {}

  async loginCustomer(email: string, password: string) {
    const user = await this.userAuthRepository.getUserByEmailAndRole(email, "customer");

    const isMatch = await bcrypt.compare(password, user.security.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "48h" }
    );

    return { token, user };
  }

  async loginManager(email: string, password: string) {
    const user = await this.userAuthRepository.getUserByEmailAndRole(email, "manager");

    const isMatch = await bcrypt.compare(password, user.security.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "48h" }
    );

    return { token, user };
  }
}
