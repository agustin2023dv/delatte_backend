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
exports.BaseUserRepository = void 0;
const inversify_1 = require("inversify");
const User_model_1 = __importDefault(require("../models/User.model"));
let BaseUserRepository = class BaseUserRepository {
    async findUserById(userId) {
        return await User_model_1.default.findById(userId);
    }
};
exports.BaseUserRepository = BaseUserRepository;
exports.BaseUserRepository = BaseUserRepository = __decorate([
    (0, inversify_1.injectable)()
], BaseUserRepository);
