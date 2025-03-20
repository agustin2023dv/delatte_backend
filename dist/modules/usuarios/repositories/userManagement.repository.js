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
exports.UserManagementRepository = void 0;
const inversify_1 = require("inversify");
const User_model_1 = __importDefault(require("../models/User.model"));
let UserManagementRepository = class UserManagementRepository {
    async getUsers(role) {
        const query = role ? { role } : {};
        return await User_model_1.default.find(query).select("-password").sort({ apellido: 1, nombre: 1 });
    }
    async getUserById(userId) {
        return await User_model_1.default.findById(userId);
    }
    async suspendUser(userId) {
        return await User_model_1.default.findByIdAndUpdate(userId, { isActive: false }, { new: true });
    }
    async deleteUser(userId) {
        await User_model_1.default.findByIdAndDelete(userId);
    }
    async getUserDetails(userId) {
        return await User_model_1.default.findById(userId).lean();
    }
    async updateUser(userId, updateData) {
        return await User_model_1.default.findByIdAndUpdate(userId, updateData, { new: true });
    }
    async verifyUserEmail(userId) {
        await User_model_1.default.findByIdAndUpdate(userId, { emailToken: null, isVerified: true });
    }
};
exports.UserManagementRepository = UserManagementRepository;
exports.UserManagementRepository = UserManagementRepository = __decorate([
    (0, inversify_1.injectable)()
], UserManagementRepository);
