import User from "../models/User.model";

export class UserAuthRepository {
  // 📌 Buscar usuario por email
  static async findUserByEmail(email: string) {
    return await User.findOne({ email });
  }

  // 📌 Buscar usuario por email y rol (para login)
  static async getUserByEmailAndRole(email: string, role: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Usuario no encontrado");
    if (user.role !== role) throw new Error("El usuario no tiene permisos para iniciar sesión");
    return user;
  }

  // 📌 Buscar usuario por token de verificación de email
  static async findUserByEmailToken(emailToken: string) {
    return await User.findOne({ emailToken });
  }

  // 📌 Guardar nueva contraseña en la base de datos
  static async updateUserPassword(userId: string, hashedPassword: string) {
    return await User.findByIdAndUpdate(userId, { password: hashedPassword });
  }
}
