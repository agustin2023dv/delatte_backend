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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAuthController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const userAccess_types_1 = require("../types/userAccess.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
let UserAuthController = class UserAuthController {
    userAuthService;
    constructor(userAuthService) {
        this.userAuthService = userAuthService;
    }
    /**
     * @swagger
     * /api/v1/users/email-verification:
     *   post:
     *     summary: Verificación de correo electrónico
     *     description: Verifica la dirección de correo electrónico de un usuario mediante un token.
     *     tags:
     *       - Users
     *     parameters:
     *       - in: query
     *         name: token
     *         required: true
     *         schema:
     *           type: string
     *         description: Token de verificación enviado por correo electrónico
     *     responses:
     *       200:
     *         description: Correo verificado con éxito
     *       400:
     *         description: Token inválido o expirado
     */
    async verificarEmail(req, res) {
        try {
            const emailToken = req.query.token;
            if (!emailToken) {
                res.status(400).json({
                    success: false,
                    message: "Token no proporcionado",
                    redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenNoProporcionado"
                });
                return;
            }
            const result = await this.userAuthService.verifyEmailToken(emailToken);
            res.status(result.success ? 200 : 400).json(result);
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: "Error interno del servidor",
                redirectUrl: "http://localhost:8082/(auth)/VerifyEmail?status=error&message=ServerError"
            });
        }
    }
    /**
     * @swagger
     * /api/v1/users/password:
     *   put:
     *     summary: Cambiar contraseña de usuario autenticado
     *     description: Permite a un usuario cambiar su contraseña actual.
     *     tags:
     *       - Users
     *     security:
     *       - BearerAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               oldPassword:
     *                 type: string
     *                 example: "OldPass123!"
     *               newPassword:
     *                 type: string
     *                 example: "NewSecurePass456!"
     *     responses:
     *       200:
     *         description: Contraseña actualizada con éxito
     *       400:
     *         description: La contraseña actual es incorrecta
     */
    async cambiarContrasena(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const { oldPassword, newPassword, confirmNewPassword } = req.body;
            const result = await this.userAuthService.changePassword(req.user.id, oldPassword, newPassword, confirmNewPassword);
            res.status(200).json({ message: result.message });
        }
        catch (error) {
            res.status(500).json({ message: "Error interno del servidor" });
        }
    }
    /**
     * @swagger
     * /api/v1/users/password-reset-requests:
     *   post:
     *     summary: Solicitar restablecimiento de contraseña
     *     description: Envia un correo con instrucciones para restablecer la contraseña.
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "usuario@example.com"
     *     responses:
     *       200:
     *         description: Correo de restablecimiento enviado
     *       404:
     *         description: Usuario no encontrado
     */
    async requestPasswordReset(req, res) {
        try {
            const { email } = req.body;
            await this.userAuthService.requestPasswordReset(email);
            res.status(200).json({ message: "Correo de restablecimiento enviado" });
        }
        catch (error) {
            res.status(404).json({ message: error instanceof Error ? error.message : "Usuario no encontrado" });
        }
    }
    /**
     * @swagger
     * /api/v1/users/password-resets:
     *   post:
     *     summary: Restablecer contraseña con token
     *     description: Permite al usuario establecer una nueva contraseña usando un token de recuperación.
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               token:
     *                 type: string
     *                 example: "abcd1234"
     *               newPassword:
     *                 type: string
     *                 example: "NewSecurePass789!"
     *     responses:
     *       200:
     *         description: Contraseña restablecida con éxito
     *       400:
     *         description: Token inválido o expirado
     */
    async resetPassword(req, res) {
        try {
            const { token, newPassword } = req.body;
            await this.userAuthService.resetPassword(token, newPassword);
            res.status(200).json({ message: "Contraseña restablecida con éxito" });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : "Token inválido o expirado" });
        }
    }
};
exports.UserAuthController = UserAuthController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/email-verification"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "verificarEmail", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/password", auth_middleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "cambiarContrasena", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/password-reset-requests"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "requestPasswordReset", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/password-resets"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAuthController.prototype, "resetPassword", null);
exports.UserAuthController = UserAuthController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/users"),
    __param(0, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.UserAuthService)),
    __metadata("design:paramtypes", [Object])
], UserAuthController);
