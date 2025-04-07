/**
 * Módulo de Inversify: `userAcessModule`
 * 
 * Define y registra todas las dependencias del dominio de acceso de usuarios,
 * incluyendo servicios, repositorios, utilidades y adaptadores externos.
 * 
 * ✔️ Permite la inyección de dependencias con `@inject` usando `USER_ACCESS_TYPES`
 * ✔️ Facilita testeo, mantenimiento y escalabilidad
 * ✔️ Aplica el patrón Service Layer y Repository
 */

// 🧭 Tipos de identificadores para inyección de dependencias
import { USER_ACCESS_TYPES } from "../types/userAccess.types";

// 🗃️ Repositorios
import { UserRegisterRepository } from "../repositories/userRegister.repository";
import { UserAuthRepository } from "../repositories/userAuth.repository";
import { UserTokenRepository } from "../repositories/userToken.repository";

// 🧠 Servicios de negocio
import { UserAuthService } from "../services/userAuth.service";
import { UserLoginService } from "../services/userLogin.service";
import { UserRegisterService } from "../services/userRegister.service";

// 🔐 Utilidades
import { PasswordHasher } from "../services/passwordHasher.service";

// 📡 Integraciones externas
import { EmailService } from "@modules/integrations/services/email.service";
import { GoogleApiService } from "@modules/integrations/services/googleApi.service";

// 🔌 Interfaces (para tipado explícito en los `bind`)
import { IUserTokenRepository } from "../interfaces/IUserTokenRepository";
import { IUserAuthService } from "../interfaces/IUserAuthService";
import { IUserAuthRepository } from "../interfaces/IUserAuthRepository";
import { IUserRegisterService } from "../interfaces/IUserRegisterService";

// 🧩 Registro de dependencias del módulo `user-access`
import { ContainerModule } from "inversify";

export const userAcessModule = new ContainerModule((bind) => {
  // Servicios principales
  bind<IUserAuthService>(USER_ACCESS_TYPES.UserAuthService).to(UserAuthService);
  bind(USER_ACCESS_TYPES.UserLoginService).to(UserLoginService);
  bind<IUserRegisterService>(USER_ACCESS_TYPES.IUserRegisterService).to(UserRegisterService);
  bind<UserRegisterService>(USER_ACCESS_TYPES.UserRegisterService).to(UserRegisterService);

  // Repositorios
  bind<IUserAuthRepository>(USER_ACCESS_TYPES.UserAuthRepository).to(UserAuthRepository);
  bind<IUserTokenRepository>(USER_ACCESS_TYPES.UserTokenRepository).to(UserTokenRepository);
  bind(USER_ACCESS_TYPES.UserRegisterRepository).to(UserRegisterRepository);

  // Utilidades y servicios auxiliares
  bind(USER_ACCESS_TYPES.PasswordHasher).to(PasswordHasher);
  bind<EmailService>(USER_ACCESS_TYPES.EmailService).to(EmailService);
  bind(USER_ACCESS_TYPES.GoogleApiService).to(GoogleApiService); // OAuth con Google
});
