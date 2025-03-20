import { injectable } from "inversify";
import Token from "../models/token.model";
import { IUserTokenRepository } from "../interfaces/IUserTokenRepository";


@injectable()
export class UserTokenRepository implements IUserTokenRepository {
  async findResetTokenByUserId(userId: string) {
    const token = await Token.findOne({ userId }).lean();
    return token ? { userId: token.userId, token: token.token, createdAt: token.createdAt } : null;
  }

  async findResetTokenByToken(token: string) {
    const tokenEntry = await Token.findOne({ token }).lean();
    return tokenEntry ? { userId: tokenEntry.userId, token: tokenEntry.token, createdAt: tokenEntry.createdAt } : null;
  }

  async createResetToken(userId: string, hashedToken: string) {
    const newToken = await new Token({ userId, token: hashedToken, createdAt: Date.now() }).save();
    return { userId: newToken.userId, token: newToken.token, createdAt: newToken.createdAt };
  }

  async deleteResetToken(userId: string) {
    await Token.deleteOne({ userId });
  }
}
