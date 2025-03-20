"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTokenRepository = void 0;
const inversify_1 = require("inversify");
const token_model_1 = __importDefault(require("../models/token.model"));
let UserTokenRepository = class UserTokenRepository {
    async findResetTokenByUserId(userId) {
        const token = await token_model_1.default.findOne({ userId }).lean();
        return token ? { userId: token.userId, token: token.token, createdAt: token.createdAt } : null;
    }
    async findResetTokenByToken(token) {
        const tokenEntry = await token_model_1.default.findOne({ token }).lean();
        return tokenEntry ? { userId: tokenEntry.userId, token: tokenEntry.token, createdAt: tokenEntry.createdAt } : null;
    }
    async createResetToken(userId, hashedToken) {
        const newToken = await new token_model_1.default({ userId, token: hashedToken, createdAt: Date.now() }).save();
        return { userId: newToken.userId, token: newToken.token, createdAt: newToken.createdAt };
    }
    async deleteResetToken(userId) {
        await token_model_1.default.deleteOne({ userId });
    }
};
exports.UserTokenRepository = UserTokenRepository;
exports.UserTokenRepository = UserTokenRepository = __decorate([
    (0, inversify_1.injectable)()
], UserTokenRepository);
