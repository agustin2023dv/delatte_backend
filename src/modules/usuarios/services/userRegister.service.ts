import { inject, injectable } from "inversify";
import crypto from "crypto";
import { UserRegisterRepository } from "../repositories/userRegister.repository";
import { EmailService } from "../../integrations/services/email.service";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { IPasswordHasher } from "../interfaces/IPasswordHasher";
import { IUserRegisterService } from "../interfaces/IUserRegisterService";
import { IUser } from "@delatte/shared/interfaces/User/IUser";
import { ICustomerRegistrationDTO, IManagerRegistrationDTO } from "@delatte/shared/dtos";

@injectable()
export class UserRegisterService implements IUserRegisterService {
  constructor(
    @inject(USER_ACCESS_TYPES.UserRegisterRepository)
    private userRegisterRepository: UserRegisterRepository,

    @inject(USER_ACCESS_TYPES.EmailService)
    private emailService: EmailService,

    @inject(USER_ACCESS_TYPES.PasswordHasher)
    private passwordHasher: IPasswordHasher
  ) {}

  async registerUser(data: ICustomerRegistrationDTO): Promise<IUser> {
    return this.register({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      password: data.password,
    }, "customer");
  }

  async registerManager(data: IManagerRegistrationDTO): Promise<IUser> {
    return this.register({
      nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
      telefono: data.telefono,
      password: data.password,
    }, "manager");
  }

  private async register(
    data: {
      nombre: string;
      apellido: string;
      email: string;
      password: string;
      telefono?: string;
    },
    role: "customer" | "manager"
  ): Promise<IUser> {
    const existingUser = await this.userRegisterRepository.findUserByEmail(data.email);
    if (existingUser) throw new Error("El correo ya está en uso.");

    const hashedPassword = await this.passwordHasher.hash(data.password);

    const newUser = await this.userRegisterRepository.createUser({
      profile: {
        nombre: data.nombre,
        apellido: data.apellido,
        email: data.email,
        phone: data.telefono,
        addresses: [],
      },
      security: {
        password: hashedPassword,
        emailToken: crypto.randomBytes(64).toString("hex"),
        isVerified: false,
      },
      role,
    });

    await this.emailService.sendVerificationEmail(
      newUser.profile.nombre,
      newUser.profile.email,
      newUser.security.emailToken || ""
    );

    return newUser;
  }
}
