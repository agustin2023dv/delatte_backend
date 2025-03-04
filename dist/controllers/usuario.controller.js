"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIDController = exports.resetPasswordController = exports.requestPasswordResetController = exports.cambiarContrasenaController = exports.updateUserDataController = exports.getUserProfileController = exports.verificarEmailController = exports.loginManagerController = exports.loginCustomerController = exports.registrarUsuarioController = void 0;
const user_service_1 = require("../services/user.service");
const auth_service_1 = require("../services/auth.service");
const email_service_1 = require("../services/email.service");
const User_model_1 = __importDefault(require("../models/User.model"));
//** Controlador para registrar un nuevo usuario **
const registrarUsuarioController = async (req, res) => {
    try {
        const { nombre, apellido, email, password } = req.body;
        const hashedPassword = await (0, auth_service_1.hashPasswordService)(password);
        const newUser = await (0, user_service_1.registerUserService)(nombre, apellido, email, hashedPassword);
        const verificationLink = `http://localhost:8081/api/auth/verify-email?token=${newUser.emailToken}`;
        await (0, email_service_1.sendEmailService)({
            to: email,
            subject: "Verifica tu email",
            text: `Hola ${nombre}, por favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
            html: `<h1>Hola ${nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
        });
        res.status(201).json({ message: "Usuario registrado con éxito. Por favor verifica tu email.", user: newUser });
    }
    catch (error) {
        console.error("Error en registrarUsuarioController:", error);
        res.status(400).json({ message: error instanceof Error ? error.message : "Error al registrar el usuario" });
    }
};
exports.registrarUsuarioController = registrarUsuarioController;
//** Controladores para iniciar sesión **
const loginCustomerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await (0, user_service_1.loginCustomerService)(email, password);
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
    }
};
exports.loginCustomerController = loginCustomerController;
const loginManagerController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await (0, user_service_1.loginManagerService)(email, password);
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Error al iniciar sesión" });
    }
};
exports.loginManagerController = loginManagerController;
//** Controlador para verificar el email **
const verificarEmailController = async (req, res) => {
    try {
        const emailToken = req.query.token;
        if (!emailToken) {
            res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenNoProporcionado`);
            return;
        }
        const user = await User_model_1.default.findOne({ emailToken });
        if (user) {
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=success&message=EmailVerificado`);
        }
        else {
            res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=error&message=TokenInvalido`);
        }
    }
    catch (error) {
        res.redirect(`http://localhost:8082/(auth)/VerifyEmail?status=error&message=ServerError`);
    }
};
exports.verificarEmailController = verificarEmailController;
//** Controlador para obtener el perfil del usuario **
const getUserProfileController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const user = await (0, user_service_1.getUserDataService)(req.user.id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: "Error en el servidor", error });
    }
};
exports.getUserProfileController = getUserProfileController;
//** Controlador para actualizar el perfil del usuario **
const updateUserDataController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const updatedUser = await (0, user_service_1.updateUserDataService)(req.body);
        res.status(200).json({ message: "Datos del usuario actualizados con éxito", user: updatedUser });
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar los datos del usuario", error: error instanceof Error ? error.message : "Error desconocido" });
    }
};
exports.updateUserDataController = updateUserDataController;
//** Controlador para cambiar contraseña **
const cambiarContrasenaController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const { oldPassword, newPassword, confirmNewPassword } = req.body;
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            res.status(400).json({ message: "Todos los campos son obligatorios" });
            return;
        }
        const result = await (0, auth_service_1.changePasswordService)(req.user.id, oldPassword, newPassword, confirmNewPassword);
        res.status(200).json({ message: result.message });
    }
    catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        res.status(500).json({ message: "Error interno del servidor" });
    }
};
exports.cambiarContrasenaController = cambiarContrasenaController;
//** Controlador para solicitar restablecimiento de contraseña **
const requestPasswordResetController = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ message: "El correo es obligatorio." });
            return;
        }
        await (0, auth_service_1.requestPasswordResetService)(email);
        res.status(200).json({ message: "Se ha enviado un enlace de restablecimiento a tu correo electrónico." });
    }
    catch (error) {
        console.error("Error en requestPasswordResetController:", error);
        res.status(500).json({ message: "Error al solicitar el restablecimiento de contraseña." });
    }
};
exports.requestPasswordResetController = requestPasswordResetController;
//** Controlador para restablecer la contraseña con el token **
const resetPasswordController = async (req, res) => {
    try {
        const { token, userId, newPassword } = req.body;
        if (!token || !userId || !newPassword) {
            res.status(400).json({ message: "Faltan datos requeridos." });
            return;
        }
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            res.status(400).json({ message: "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo." });
            return;
        }
        await (0, auth_service_1.resetPasswordService)(token, userId, newPassword);
        res.status(200).json({ message: "Contraseña restablecida exitosamente." });
    }
    catch (error) {
        console.error("Error en resetPasswordController:", error);
        res.status(500).json({ message: "Error al restablecer la contraseña." });
    }
};
exports.resetPasswordController = resetPasswordController;
const getUserByIDController = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        const user = (0, user_service_1.getUserByIDService)(id);
        res.status(200).json(user);
    }
    catch (error) {
        console.error("Error en getUserByIDController:", error);
        res.status(500).json({ message: "Error interno del servidor" });
        return;
    }
};
exports.getUserByIDController = getUserByIDController;
