"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAddressService = exports.addAddressService = exports.getUserAddressesService = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
//* SERVICIOS PARA EL MANEJO DE DIRECCIONES
const getUserAddressesService = async (userId) => {
    const user = await User_model_1.default.findById(userId).select("addresses");
    if (!user)
        throw new Error("Usuario no encontrado");
    return user.addresses;
};
exports.getUserAddressesService = getUserAddressesService;
const addAddressService = async (userId, newAddress) => {
    const user = await User_model_1.default.findById(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    // Inicializar el array si no existe
    if (!user.addresses)
        user.addresses = [];
    user.addresses.push(newAddress);
    await user.save();
    return user.addresses;
};
exports.addAddressService = addAddressService;
const removeAddressService = async (userId, address) => {
    const user = await User_model_1.default.findById(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    // Inicializar el array si no existe
    if (!user.addresses)
        user.addresses = [];
    user.addresses = user.addresses.filter((addr) => addr !== address);
    await user.save();
    return user.addresses;
};
exports.removeAddressService = removeAddressService;
