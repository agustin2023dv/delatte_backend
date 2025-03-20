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
exports.UserRegisterService = void 0;
const inversify_1 = require("inversify");
const crypto_1 = __importDefault(require("crypto"));
const userRegister_repository_1 = require("../repositories/userRegister.repository");
const email_service_1 = require("../../integrations/services/email.service");
const userAccess_types_1 = require("../types/userAccess.types");
let UserRegisterService = class UserRegisterService {
    userRegisterRepository;
    emailService;
    passwordHasher;
    constructor(userRegisterRepository, emailService, passwordHasher) {
        this.userRegisterRepository = userRegisterRepository;
        this.emailService = emailService;
        this.passwordHasher = passwordHasher;
    }
    async registerUser(nombre, apellido, email, password) {
        return await this.createUserWithRole(nombre, apellido, email, password, "customer");
    }
    async registerManager(managerData) {
        return await this.createUserWithRole(managerData.nombre, managerData.apellido, managerData.email, managerData.password, "manager");
    }
    async createUserWithRole(nombre, apellido, email, password, role) {
        const existingUser = await this.userRegisterRepository.findUserByEmail(email);
        if (existingUser)
            throw new Error("El correo ya está en uso.");
        const hashedPassword = await this.passwordHasher.hash(password);
        const newUser = await this.userRegisterRepository.createUser({
            nombre,
            apellido,
            email,
            password: hashedPassword,
            role,
            emailToken: crypto_1.default.randomBytes(64).toString("hex"),
            isVerified: false,
        });
        await this.emailService.sendVerificationEmail(newUser.nombre, newUser.email, newUser.emailToken || "");
        return newUser;
    }
};
exports.UserRegisterService = UserRegisterService;
exports.UserRegisterService = UserRegisterService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.UserRegisterRepository)),
    __param(1, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.EmailService)),
    __param(2, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.PasswordHasher)),
    __metadata("design:paramtypes", [userRegister_repository_1.UserRegisterRepository,
        email_service_1.EmailService, Object])
], UserRegisterService);
