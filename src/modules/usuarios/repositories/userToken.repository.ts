import Token from "../models/token.model";

export class UserTokenRepository {
  // 📌 Buscar token de restablecimiento por usuario ID
  static async findResetTokenByUserId(userId: string) {
    return await Token.findOne({ userId });
  }

  // 📌 Crear un nuevo token de restablecimiento
  static async createResetToken(userId: string, hashedToken: string) {
    return await new Token({ userId, token: hashedToken, createdAt: Date.now() }).save();
  }

  // 📌 Eliminar un token de restablecimiento
  static async deleteResetToken(userId: string) {
    return await Token.deleteOne({ userId });
  }
}
