import { inject, injectable } from "inversify";
import crypto from "crypto";
import { UserRegisterRepository } from "../repositories/userRegister.repository";
import { EmailService } from "../../integrations/services/email.service";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { IUserRegisterService } from "../interfaces/IUserRegisterService";
import { IUser } from "@delatte/shared/interfaces/User/IUser";

@injectable()
export class UserRegisterService implements IUserRegisterService {
  constructor(
    @inject(USER_ACCESS_TYPES.UserRegisterRepository) private userRegisterRepository: UserRegisterRepository,
    @inject(USER_ACCESS_TYPES.EmailService) private emailService: EmailService,
    @inject(USER_ACCESS_TYPES.PasswordHasher) private passwordHasher: IPasswordHasher 
  ) {}

  async registerUser(nombre: string, apellido: string, email: string, password: string): Promise<IUser> {
    return await this.createUserWithRole(nombre, apellido, email, password, "customer");
  }

  async registerManager(managerData: { nombre: string; apellido: string; email: string; password: string }): Promise<IUser> {
    return await this.createUserWithRole(managerData.nombre, managerData.apellido, managerData.email, managerData.password, "manager");
  }

  private async createUserWithRole(nombre: string, apellido: string, email: string, password: string, role: "customer" | "manager" | "superadmin"): Promise<IUser> {
    const existingUser = await this.userRegisterRepository.findUserByEmail(email);
    if (existingUser) throw new Error("El correo ya está en uso.");

    const hashedPassword = await this.passwordHasher.hash(password); 

    const newUser = await this.userRegisterRepository.createUser({
      nombre,
      apellido,
      email,
      password: hashedPassword,
      role,
      emailToken: crypto.randomBytes(64).toString("hex"),
      isVerified: false,
    });

    await this.emailService.sendVerificationEmail(newUser.nombre, newUser.email, newUser.emailToken || "");
    return newUser;
  }
}
