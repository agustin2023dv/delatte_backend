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
exports.UserAddressRepository = void 0;
const inversify_1 = require("inversify");
const User_model_1 = __importDefault(require("../../../modules/usuarios/models/User.model"));
let UserAddressRepository = class UserAddressRepository {
    async getUserAddresses(userId) {
        const user = await User_model_1.default.findById(userId).select("addresses");
        if (!user)
            throw new Error("Usuario no encontrado");
        return user.addresses;
    }
    async addUserAddress(userId, newAddress) {
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new Error("Usuario no encontrado");
        if (!user.addresses)
            user.addresses = [];
        user.addresses.push(newAddress);
        await user.save();
        return user.addresses;
    }
    async removeUserAddress(userId, address) {
        const user = await User_model_1.default.findById(userId);
        if (!user)
            throw new Error("Usuario no encontrado");
        if (!user.addresses)
            user.addresses = [];
        user.addresses = user.addresses.filter((addr) => addr !== address);
        await user.save();
        return user.addresses;
    }
};
exports.UserAddressRepository = UserAddressRepository;
exports.UserAddressRepository = UserAddressRepository = __decorate([
    (0, inversify_1.injectable)()
], UserAddressRepository);
