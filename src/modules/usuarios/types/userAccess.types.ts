/**
 * Mapa de identificadores `USER_ACCESS_TYPES`
 * 
 * Define los símbolos únicos utilizados por InversifyJS para resolver dependencias
 * en el módulo de autenticación y registro de usuarios (`user-access`).
 *
 * ✔️ Facilita la inyección de servicios, repositorios y utilidades
 * ✔️ Evita errores por nombres duplicados o conflictos
 * ✔️ Mejora la mantenibilidad y escalabilidad del proyecto
 */

export const USER_ACCESS_TYPES = {
  // 🗂️ Repositorios de autenticación y base de usuarios
  UserAuthRepository: Symbol.for("UserAuthRepository"),
  UserTokenRepository: Symbol.for("UserTokenRepository"),
  BaseUserRepository: Symbol.for("BaseUserRepository"),
  UserRegisterRepository: Symbol.for("UserRegisterRepository"),

  // 🔐 Servicios de autenticación y registro
  UserLoginService: Symbol.for("UserLoginService"),
  UserRegisterService: Symbol.for("UserRegisterService"),
  UserAuthService: Symbol.for("UserAuthService"),

  // 🔧 Utilidades y servicios externos
  EmailService: Symbol.for("EmailService"),
  PasswordHasher: Symbol.for("PasswordHasher"),
  GoogleApiService: Symbol.for("GoogleApiService"),

  // 🧩 Interfaces 
  IUserRegisterService: Symbol.for("IUserRegisterService"),
};
