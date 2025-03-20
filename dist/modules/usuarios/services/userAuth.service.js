"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthService = void 0;
const inversify_1 = require("inversify");
const crypto_1 = __importDefault(require("crypto"));
const email_service_1 = require("../../integrations/services/email.service");
const userAccess_types_1 = require("../types/userAccess.types");
const userProfile_types_1 = require("../types/userProfile.types");
const userManagement_types_1 = require("../types/userManagement.types");
let UserAuthService = class UserAuthService {
    userAuthRepository;
    userManagementRepository;
    userProfileRepository;
    userTokenRepository;
    emailService;
    passwordHasher;
    constructor(userAuthRepository, userManagementRepository, userProfileRepository, userTokenRepository, emailService, passwordHasher) {
        this.userAuthRepository = userAuthRepository;
        this.userManagementRepository = userManagementRepository;
        this.userProfileRepository = userProfileRepository;
        this.userTokenRepository = userTokenRepository;
        this.emailService = emailService;
        this.passwordHasher = passwordHasher;
    }
    async verifyEmailToken(emailToken) {
        const user = await this.userAuthRepository.findUserByEmailToken(emailToken);
        if (!user) {
            return {
                success: false,
                message: "Token inválido",
                redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenInvalido",
            };
        }
        await this.userManagementRepository.verifyUserEmail(user._id.toString());
        return {
            success: true,
            message: "Email verificado correctamente",
            redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=success&message=EmailVerificado",
        };
    }
    async requestPasswordReset(email) {
        const user = await this.userAuthRepository.findUserByEmail(email);
        if (!user)
            throw new Error("El usuario no existe");
        await this.userTokenRepository.deleteResetToken(user._id.toString());
        const resetToken = crypto_1.default.randomBytes(64).toString("hex");
        const hashedToken = await this.passwordHasher.hash(resetToken);
        await this.userTokenRepository.createResetToken(user._id.toString(), hashedToken);
        const resetLink = `http://localhost:8082/screens/auth/forgotPassword/ResetPassword?token=${resetToken}&id=${user._id}`;
        await this.emailService.sendEmail({
            to: user.email,
            subject: "Restablecimiento de contraseña",
            text: `Hola ${user.nombre},\n\nPuedes restablecer tu contraseña aquí: ${resetLink}`,
            html: `<h1>Hola ${user.nombre}!</h1><p>Puedes restablecer tu contraseña aquí:</p><a href="${resetLink}">Restablecer contraseña</a>`,
        });
    }
    async resetPassword(token, newPassword) {
        const resetTokenEntry = await this.userTokenRepository.findResetTokenByToken(token);
        if (!resetTokenEntry)
            throw new Error("Token inválido o expirado");
        const userId = resetTokenEntry.userId.toString();
        const user = await this.userManagementRepository.getUserById(userId);
        if (!user)
            throw new Error("Usuario no encontrado");
        user.password = await this.passwordHasher.hash(newPassword);
        await this.userAuthRepository.updateUserPassword(user._id.toString(), user.password);
        await this.userTokenRepository.deleteResetToken(user._id.toString());
    }
    async changePassword(userId, oldPassword, newPassword, confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
            throw new Error("Las contraseñas no coinciden");
        }
        const user = await this.userProfileRepository.findUserById(userId);
        if (!user)
            throw new Error("Usuario no encontrado");
        const isMatch = await this.passwordHasher.compare(oldPassword, user.password);
        if (!isMatch)
            throw new Error("La contraseña actual es incorrecta");
        const hashedPassword = await this.passwordHasher.hash(newPassword);
        await this.userAuthRepository.updateUserPassword(userId, hashedPassword);
        return { message: "Contraseña actualizada correctamente" };
    }
};
exports.UserAuthService = UserAuthService;
exports.UserAuthService = UserAuthService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.UserAuthRepository)),
    __param(1, (0, inversify_1.inject)(userManagement_types_1.USER_MANAGEMENT_TYPES.UserManagementRepository)),
    __param(2, (0, inversify_1.inject)(userProfile_types_1.USER_PROFILE_TYPES.UserProfileRepository)),
    __param(3, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.UserTokenRepository)),
    __param(4, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.EmailService)),
    __param(5, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.PasswordHasher)),
    __metadata("design:paramtypes", [Object, Object, Object, Object, email_service_1.EmailService, Object])
], UserAuthService);
