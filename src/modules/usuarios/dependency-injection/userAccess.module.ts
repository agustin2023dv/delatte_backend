import { ContainerModule } from "inversify";
import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { UserRegisterRepository } from "../repositories/userRegister.repository";
import { UserAuthService } from "../services/userAuth.service";
import { UserLoginService } from "../services/userLogin.service";
import { IUserTokenRepository } from "../interfaces/IUserTokenRepository";
import { UserTokenRepository } from "../repositories/userToken.repository";
import { IUserAuthService } from "../interfaces/IUserAuthService";
import { IUserAuthRepository } from "../interfaces/IUserAuthRepository";
import { UserAuthRepository } from "../repositories/userAuth.repository";
import { PasswordHasher } from "../services/passwordHasher.service";
import { IUserRegisterService } from "../interfaces/IUserRegisterService";
import { UserRegisterService } from "../services/userRegister.service";
import { EmailService } from "@modules/integrations/services/email.service";

export const userAcessModule = new ContainerModule((bind) => {
  bind<IUserAuthService>(USER_ACCESS_TYPES.UserAuthService).to(UserAuthService);
  bind<IUserAuthRepository>(USER_ACCESS_TYPES.UserAuthRepository).to(UserAuthRepository);
  bind<IUserTokenRepository>(USER_ACCESS_TYPES.UserTokenRepository).to(UserTokenRepository);
  bind<IUserRegisterService>(USER_ACCESS_TYPES.IUserRegisterService).to(UserRegisterService);
bind<UserRegisterService>(USER_ACCESS_TYPES.UserRegisterService).to(UserRegisterService);

  bind(USER_ACCESS_TYPES.PasswordHasher).to(PasswordHasher);
  bind<EmailService>(USER_ACCESS_TYPES.EmailService).to(EmailService);
  bind(USER_ACCESS_TYPES.UserRegisterRepository).to(UserRegisterRepository);
  bind(USER_ACCESS_TYPES.UserLoginService).to(UserLoginService);
});

