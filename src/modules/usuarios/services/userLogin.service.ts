/**
 * Servicio `UserLoginService`
 *
 * Encapsula la lógica de autenticación de usuarios en Delatte.
 *
 * ✔️ Login tradicional con email y contraseña (customer o manager)
 * ✔️ Login o registro automático mediante Google OAuth
 * ✔️ Generación de JWT para sesiones seguras
 *
 * Este servicio actúa como capa intermedia entre el controlador
 * y los repositorios de datos. Aplica principios de Service Layer
 * y respeta la separación de responsabilidades.
 */

import { inject, injectable } from "inversify";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { UserAuthRepository } from "../repositories/userAuth.repository";
import { UserRegisterRepository } from "../repositories/userRegister.repository";
import { GoogleApiService } from "@modules/integrations/services/googleApi.service";

import { USER_ACCESS_TYPES } from "../types/userAccess.types";
import { IUser } from "@delatte/shared/interfaces";

@injectable()
export class UserLoginService {
  constructor(
    @inject(USER_ACCESS_TYPES.UserAuthRepository)
    private userAuthRepository: UserAuthRepository,

    @inject(USER_ACCESS_TYPES.UserRegisterRepository)
    private userRegisterRepository: UserRegisterRepository,

    @inject(USER_ACCESS_TYPES.GoogleApiService)
    private googleApiService: GoogleApiService
  ) {}

  /**
   * Autentica a un cliente mediante email y contraseña
   * 
   * @param email Email del usuario
   * @param password Contraseña en texto plano
   * @returns Token JWT + datos del usuario
   * @throws Si la contraseña es incorrecta
   */
  async loginCustomer(email: string, password: string) {
    const user = await this.userAuthRepository.getUserByEmailAndRole(email, "customer");
  
    if (!user.security.isVerified) {
      throw new Error("Debes verificar tu correo electrónico antes de iniciar sesión.");
    }
  
    const isMatch = await bcrypt.compare(password, user.security.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");
  
    const token = this.generateToken(user);
    return { token, user };
  }

  /**
   * Autentica a un manager mediante email y contraseña
   * 
   * @param email Email del manager
   * @param password Contraseña en texto plano
   * @returns Token JWT + datos del usuario
   * @throws Si la contraseña es incorrecta
   */
  async loginManager(email: string, password: string) {
    const user = await this.userAuthRepository.getUserByEmailAndRole(email, "manager");
  
    if (!user.security.isVerified) {
      throw new Error("Debes verificar tu correo electrónico antes de iniciar sesión.");
    }
  
    const isMatch = await bcrypt.compare(password, user.security.password);
    if (!isMatch) throw new Error("Contraseña incorrecta");
  
    const token = this.generateToken(user);
    return { token, user };
  }

  /**
   * Autentica o registra un usuario usando Google OAuth
   *
   * ✔️ Verifica el access token con Google
   * ✔️ Si el usuario no existe, lo registra automáticamente
   * ✔️ Devuelve un JWT + los datos del usuario
   * 
   * @param accessToken Token válido de Google
   * @returns Token JWT + datos del usuario
   */
  async loginOrRegisterWithGoogle(accessToken: string): Promise<{ token: string; user: IUser }> {
    const googleUser = await this.googleApiService.verifyAccessToken(accessToken);
  
    // 🔍 Busca si el usuario ya existe por email
    let user = await this.userRegisterRepository.findUserByEmail(googleUser.email);
  
    // ❌ Si existe pero tiene contraseña (cuenta manual), bloqueamos login por Google
    if (user && user.security.password) {
      throw new Error("Este email ya está registrado con una cuenta manual. Iniciá sesión con tu contraseña.");
    }
  
    // 🆕 Si no existe, lo crea como 'customer'
    if (!user) {
      user = await this.userRegisterRepository.createUser({
        profile: {
          nombre: googleUser.given_name,
          apellido: googleUser.family_name,
          email: googleUser.email,
          addresses: [],
        },
        security: {
          password: "", // sin contraseña = login por OAuth
          emailToken: null,
          isVerified: true,
        },
        role: "customer",
      });
    }
  
    const token = this.generateToken(user);
    return { token, user };
  }


  /**
 * Autentica a un usuario que ya se registró mediante Google OAuth.
 *
 * ✔️ Verifica el access token con Google
 * ✔️ Devuelve JWT si el usuario existe y no tiene contraseña
 * ❌ Lanza error si el usuario no existe o tiene cuenta manual
 * 
 * @param accessToken Token válido de Google
 * @returns Token JWT + datos del usuario
 */
async loginWithGoogle(accessToken: string): Promise<{ token: string; user: IUser }> {
  const googleUser = await this.googleApiService.verifyAccessToken(accessToken);

  const user = await this.userRegisterRepository.findUserByEmail(googleUser.email);

  if (!user) {
    throw new Error("No encontramos una cuenta con ese correo. Registrate primero.");
  }

  if (user.security.password) {
    throw new Error("Este email ya está registrado como cuenta manual. Usá tu contraseña.");
  }

  const token = this.generateToken(user);
  return { token, user };
}


  /**
   * Genera un token JWT válido para el usuario autenticado
   *
   * @param user Usuario autenticado
   * @returns Token firmado con secreto y expiración
   */
  private generateToken(user: IUser): string {
    return jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "48h" }
    );
  }
}
