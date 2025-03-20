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
exports.UserAccessController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const userLogin_service_1 = require("../services/userLogin.service");
const userRegister_service_1 = require("../services/userRegister.service");
const rateLimiter_middlware_1 = require("../../../middlewares/rateLimiter.middlware");
const userAccess_types_1 = require("../types/userAccess.types");
let UserAccessController = class UserAccessController {
    userRegisterService;
    userLoginService;
    constructor(userRegisterService, userLoginService) {
        this.userRegisterService = userRegisterService;
        this.userLoginService = userLoginService;
    }
    /**
     * @swagger
     * /api/v1/auth:
     *   post:
     *     summary: Inicio de sesión para clientes
     *     description: Permite a los clientes autenticarse en la plataforma.
     *     tags:
     *       - Authentication
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "cliente@example.com"
     *               password:
     *                 type: string
     *                 example: "SecurePass123!"
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     */
    async loginCustomer(req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = await this.userLoginService.loginCustomer(email, password);
            res.status(200).json({ token, user });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
        }
    }
    /**
     * @swagger
     * /api/v1/auth/manager:
     *   post:
     *     summary: Inicio de sesión para managers
     *     description: Permite a los managers autenticarse en la plataforma.
     *     tags:
     *       - Authentication
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               email:
     *                 type: string
     *                 example: "manager@example.com"
     *               password:
     *                 type: string
     *                 example: "SecurePass123!"
     *     responses:
     *       200:
     *         description: Inicio de sesión exitoso
     */
    async loginManager(req, res) {
        try {
            const { email, password } = req.body;
            const { token, user } = await this.userLoginService.loginManager(email, password);
            res.status(200).json({ token, user });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
        }
    }
    /**
     * @swagger
     * /api/v1/users:
     *   post:
     *     summary: Registro de un nuevo usuario
     *     description: Permite a un usuario registrarse en la plataforma.
     *     tags:
     *       - Users
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               nombre:
     *                 type: string
     *                 example: "Juan"
     *               apellido:
     *                 type: string
     *                 example: "Pérez"
     *               email:
     *                 type: string
     *                 example: "juan@example.com"
     *               password:
     *                 type: string
     *                 example: "SecurePass123!"
     *     responses:
     *       201:
     *         description: Usuario registrado con éxito
     */
    async registrarUsuario(req, res) {
        try {
            const { nombre, apellido, email, password } = req.body;
            const newUser = await this.userRegisterService.registerUser(nombre, apellido, email, password);
            res.status(201).json({
                message: "Usuario registrado con éxito. Por favor verifica tu email.",
                user: newUser,
            });
        }
        catch (error) {
            res.status(400).json({ message: error instanceof Error ? error.message : "Error al registrar el usuario" });
        }
    }
};
exports.UserAccessController = UserAccessController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/auth", rateLimiter_middlware_1.loginRateLimiter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAccessController.prototype, "loginCustomer", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/auth/manager", rateLimiter_middlware_1.loginRateLimiter),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAccessController.prototype, "loginManager", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAccessController.prototype, "registrarUsuario", null);
exports.UserAccessController = UserAccessController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1"),
    __param(0, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.UserRegisterService)),
    __param(1, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.UserLoginService)),
    __metadata("design:paramtypes", [userRegister_service_1.UserRegisterService,
        userLogin_service_1.UserLoginService])
], UserAccessController);
