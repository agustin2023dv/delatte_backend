"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordService = exports.resetPasswordService = exports.requestPasswordResetService = exports.comparePasswordService = exports.hashPasswordService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./user.service");
const token_model_1 = __importDefault(require("../models/token.model"));
const crypto_1 = __importDefault(require("crypto"));
const User_model_1 = __importDefault(require("../models/User.model"));
const email_service_1 = require("./email.service");
const saltRounds = 10; // Número de rondas para generar el salt
const hashPasswordService = async (password) => {
    // Hashear la contraseña utilizando bcrypt con el número de rondas de salt
    const hashedPassword = await bcrypt_1.default.hash(password, saltRounds);
    return hashedPassword; // Devolver la contraseña hasheada
};
exports.hashPasswordService = hashPasswordService;
const comparePasswordService = async (password, hashedPassword) => {
    // Comparar la contraseña proporcionada con la almacenada hasheada
    const isMatch = await bcrypt_1.default.compare(password, hashedPassword);
    return isMatch; // Devolver si la comparación fue exitosa o no
};
exports.comparePasswordService = comparePasswordService;
const requestPasswordResetService = async (email) => {
    // Buscar al usuario por su email
    const user = await (0, user_service_1.findUserByEmailService)(email);
    if (!user) {
        throw new Error('El usuario no existe');
    }
    // Eliminar cualquier token existente para este usuario
    const existingToken = await token_model_1.default.findOne({ userId: user._id });
    if (existingToken)
        await existingToken.deleteOne();
    // Generar un nuevo token de restablecimiento
    const resetToken = crypto_1.default.randomBytes(64).toString('hex');
    const hashedToken = await bcrypt_1.default.hash(resetToken, saltRounds);
    // Guardar el token hasheado en la base de datos
    await new token_model_1.default({
        userId: user._id,
        token: hashedToken,
        createdAt: Date.now(),
    }).save();
    // Generar el enlace de restablecimiento de contraseña
    const resetLink = `http://localhost:8082/screens/auth/forgotPassword/ResetPassword?token=${resetToken}&id=${user._id}`;
    // Enviar el correo al usuario con el enlace de restablecimiento
    try {
        await (0, email_service_1.sendEmailService)({
            to: user.email,
            subject: 'Restablecimiento de contraseña',
            text: `Hola ${user.nombre},\n\nPuedes restablecer tu contraseña haciendo clic en el siguiente enlace: ${resetLink}\n\nSi no solicitaste este cambio, ignora este mensaje.`,
            html: `<h1>Hola ${user.nombre}!</h1><p>Puedes restablecer tu contraseña haciendo clic en el siguiente enlace:</p><a href="${resetLink}">Restablecer contraseña</a><p>Si no solicitaste este cambio, ignora este mensaje.</p>`,
        });
    }
    catch (error) {
        console.error('Error al enviar el correo de restablecimiento:', error);
        throw new Error('Error al enviar el correo de restablecimiento de contraseña');
    }
};
exports.requestPasswordResetService = requestPasswordResetService;
const resetPasswordService = async (token, userId, newPassword) => {
    const storedToken = await token_model_1.default.findOne({ userId });
    // Validar que el token exista y coincida
    if (!storedToken || !(await bcrypt_1.default.compare(token, storedToken.token))) {
        throw new Error('Token inválido o expirado');
    }
    // Validar que el token no haya caducado
    const tokenAge = Date.now() - storedToken.createdAt.getTime();
    if (tokenAge > 3600000) { // 1 hora
        await storedToken.deleteOne();
        throw new Error('Token expirado');
    }
    // Buscar al usuario
    const user = await User_model_1.default.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Hashear la nueva contraseña
    const hashedPassword = await bcrypt_1.default.hash(newPassword, 10);
    // Actualizar la contraseña del usuario
    user.password = hashedPassword;
    await user.save();
    // Eliminar el token después de su uso
    await storedToken.deleteOne();
};
exports.resetPasswordService = resetPasswordService;
//* Servicio para CAMBIAR contraseña
const changePasswordService = async (userId, oldPassword, newPassword, confirmNewPassword) => {
    // Verificar si la nueva contraseña y su confirmación coinciden
    if (newPassword !== confirmNewPassword) {
        throw new Error('La nueva contraseña y la confirmación no coinciden');
    }
    // Buscar al usuario por su ID
    const user = await User_model_1.default.findById(userId);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar la contraseña actual
    const isMatch = await (0, exports.comparePasswordService)(oldPassword, user.password);
    if (!isMatch) {
        throw new Error('La contraseña actual es incorrecta');
    }
    // Hashear la nueva contraseña
    const hashedNewPassword = await (0, exports.hashPasswordService)(newPassword);
    // Actualizar la contraseña en el registro del usuario
    user.password = hashedNewPassword;
    await user.save(); // Guardar cambios en la base de datos
    return { message: 'Contraseña actualizada correctamente' };
};
exports.changePasswordService = changePasswordService;
