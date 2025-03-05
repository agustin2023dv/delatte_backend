"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdminService = exports.updateUserService = exports.getUserDetailsService = exports.deleteUserService = exports.suspendUserService = exports.getUsersService = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const auth_service_1 = require("./auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getUsersService = async (role) => {
    try {
        const query = role ? { role } : {};
        return await User_model_1.default.find(query)
            .select("-password")
            .sort({ apellido: 1, nombre: 1 });
    }
    catch (error) {
        throw new Error("Error al obtener usuarios de la base de datos");
    }
};
exports.getUsersService = getUsersService;
// Suspender usuario (validación de ID y manejo de `isActive`)
const suspendUserService = async (userId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new Error("ID de usuario no válido");
    }
    const user = await User_model_1.default.findById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    if (!user.isActive) {
        throw new Error("El usuario ya está suspendido");
    }
    return await User_model_1.default.findByIdAndUpdate(userId, { isActive: false }, { new: true });
};
exports.suspendUserService = suspendUserService;
// Eliminar usuario (validación de ID y evitar eliminar superadmins)
const deleteUserService = async (userId) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new Error("ID de usuario no válido");
    }
    const user = await User_model_1.default.findById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    if (user.role === "superadmin") {
        throw new Error("No se puede eliminar un superadmin");
    }
    return await User_model_1.default.findByIdAndDelete(userId);
};
exports.deleteUserService = deleteUserService;
const getUserDetailsService = async (userId) => {
    try {
        const user = await User_model_1.default.findById(userId);
        if (!user) {
            throw new Error('fkn user no encontrado');
        }
        return user;
    }
    catch (error) {
        throw new Error('Error al obtener los detalles del user');
    }
};
exports.getUserDetailsService = getUserDetailsService;
// Actualizar usuario (validación de ID)
const updateUserService = async (userId, updateData) => {
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new Error("ID de usuario no válido");
    }
    // Evitar que `emailToken` sea modificado
    const { emailToken, password, ...filteredUpdateData } = updateData;
    return await User_model_1.default.findByIdAndUpdate(userId, filteredUpdateData, { new: true }).select("-emailToken");
};
exports.updateUserService = updateUserService;
//* Servicio para login de CUSTOMER
const loginAdminService = async (email, password) => {
    const user = await User_model_1.default.findOne({ email });
    // Verificar si el usuario existe
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar si el rol es 'superadmin'
    if (user.role !== 'superadmin') {
        throw new Error('El usuario no tiene permisos para iniciar sesión como cliente');
    }
    // Verificar la contraseña
    const isMatch = await (0, auth_service_1.comparePasswordService)(password, user.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }
    // Generar token JWT si la autenticación es correcta
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '48h' });
    return { token, user };
};
exports.loginAdminService = loginAdminService;
