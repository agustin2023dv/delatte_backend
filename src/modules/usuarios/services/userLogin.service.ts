import { UserAuthRepository } from "../repositories/userAuth.repository";
import { UserAuthService } from "./userAuth.service"; 
import jwt from "jsonwebtoken";

export class UserLoginService {
  
  // 📌 Servicio para login de CUSTOMER
  static async loginCustomer(email: string, password: string) {
    const user = await UserAuthRepository.getUserByEmailAndRole(email, "customer");

    const isMatch = await UserAuthService.comparePassword(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "48h" });

    return { token, user };
  }

  // 📌 Servicio para login de MANAGER
  static async loginManager(email: string, password: string) {
    const user = await UserAuthRepository.getUserByEmailAndRole(email, "manager");

    const isMatch = await UserAuthService.comparePassword(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign(
      { id: user._id, role: user.role, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: "10h" }
    );

    return { token, user };
  }

  // 📌 Servicio para login de ADMIN (Superadmin)
  static async loginAdmin(email: string, password: string) {
    const user = await UserAuthRepository.getUserByEmailAndRole(email, "superadmin");

    const isMatch = await UserAuthService.comparePassword(password, user.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, { expiresIn: "48h" });

    return { token, user };
  }
}
