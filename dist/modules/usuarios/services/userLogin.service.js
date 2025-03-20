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
exports.UserLoginService = void 0;
const inversify_1 = require("inversify");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userAuth_repository_1 = require("../repositories/userAuth.repository");
const userAccess_types_1 = require("../types/userAccess.types");
let UserLoginService = class UserLoginService {
    userAuthRepository;
    constructor(userAuthRepository) {
        this.userAuthRepository = userAuthRepository;
    }
    async loginCustomer(email, password) {
        const user = await this.userAuthRepository.getUserByEmailAndRole(email, "customer");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Contraseña incorrecta");
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "48h" });
        return { token, user };
    }
    async loginManager(email, password) {
        const user = await this.userAuthRepository.getUserByEmailAndRole(email, "manager");
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Contraseña incorrecta");
        const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "48h" });
        return { token, user };
    }
};
exports.UserLoginService = UserLoginService;
exports.UserLoginService = UserLoginService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.UserAuthRepository)),
    __metadata("design:paramtypes", [userAuth_repository_1.UserAuthRepository])
], UserLoginService);
