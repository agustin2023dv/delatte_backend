<<<<<<< Updated upstream
import { UserAuthRepository } from "../repositories/userAuth.repository";
import { comparePasswordService } from "./userAuth.service";
=======
import { inject, injectable } from "inversify";
>>>>>>> Stashed changes
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserAuthRepository } from "../repositories/userAuth.repository";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";

<<<<<<< Updated upstream
// 📌 Servicio para login de CUSTOMER
export const loginCustomerService = async (email: string, password: string) => {
  const user = await UserAuthRepository.getUserByEmailAndRole(email, "customer");

  const isMatch = await comparePasswordService(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "48h" });

  return { token, user };
};

// 📌 Servicio para login de MANAGER
export const loginManagerService = async (email: string, password: string) => {
  const user = await UserAuthRepository.getUserByEmailAndRole(email, "manager");

  const isMatch = await comparePasswordService(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  const token = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "10h" }
  );

  return { token, user };
};

// 📌 Servicio para login de ADMIN (Superadmin)
export const loginAdminService = async (email: string, password: string) => {
  const user = await UserAuthRepository.getUserByEmailAndRole(email, "superadmin");

  const isMatch = await comparePasswordService(password, user.password);
  if (!isMatch) throw new Error("Contraseña incorrecta");

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "48h" });

  return { token, user };
};
=======

@injectable()
export class UserLoginService {
  constructor(@inject(USER_ACCESS_TYPES.UserAuthRepository) private userAuthRepository: UserAuthRepository) {}

  async loginCustomer(email: string, password: string) {
    const user = await this.userAuthRepository.getUserByEmailAndRole(email, "customer");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "48h" });
    return { token, user };
  }

  async loginManager(email: string, password: string) {
    const user = await this.userAuthRepository.getUserByEmailAndRole(email, "manager");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "48h" });
    return { token, user };
  }
}
>>>>>>> Stashed changes
