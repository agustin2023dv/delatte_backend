import { Types } from "mongoose";

export interface IUserTokenRepository {
  findResetTokenByUserId(userId: string): Promise<{ userId: Types.ObjectId; token: string; createdAt: Date } | null>;
  findResetTokenByToken(token: string): Promise<{ userId: Types.ObjectId; token: string; createdAt: Date } | null>;
  createResetToken(userId: string, hashedToken: string): Promise<{ userId: Types.ObjectId; token: string; createdAt: Date }>;
  deleteResetToken(userId: string): Promise<void>;
}
