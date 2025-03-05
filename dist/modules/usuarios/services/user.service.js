"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIDService = exports.updateUserDataService = exports.getUserDataService = exports.loginManagerService = exports.loginCustomerService = exports.registerManagerService = exports.registerUserService = exports.findUserByIdService = exports.findUserByEmailService = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const crypto_1 = __importDefault(require("crypto"));
const auth_service_1 = require("./auth.service");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const mongoose_1 = __importDefault(require("mongoose"));
const email_service_1 = require("../../integrations/services/email.service");
//* Servicio para OBTENER usuario por email
const findUserByEmailService = async (email) => {
    return await User_model_1.default.findOne({ email }); // Buscar usuario por email en la base de datos
};
exports.findUserByEmailService = findUserByEmailService;
const findUserByIdService = async (userId) => {
    try {
        // Convertir el ID de string a ObjectId
        const objectId = new mongoose_1.default.Types.ObjectId(userId);
        // Buscar el usuario por su _id
        const user = await User_model_1.default.findOne({ _id: objectId });
        return user;
    }
    catch (error) {
        console.error("Error al buscar el usuario por ID:", error);
        throw error;
    }
};
exports.findUserByIdService = findUserByIdService;
//* Servicio para CREAR usuario
const registerUserService = async (nombre, apellido, email, hashedPassword) => {
    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await (0, exports.findUserByEmailService)(email);
    if (existingUser) {
        throw new Error('El correo ya está en uso.'); // Lanzar error si el email ya está registrado
    }
    // Crear un nuevo usuario con el token de verificación de email
    const newUser = new User_model_1.default({
        nombre,
        apellido,
        email,
        password: hashedPassword,
        emailToken: crypto_1.default.randomBytes(64).toString('hex'), // Generar un token único para la verificación del email
        isVerified: false
    });
    console.log('Guardando nuevo usuario:', newUser);
    try {
        // Guardar el usuario en la base de datos
        const savedUser = await newUser.save();
        console.log('Usuario guardado:', savedUser);
        return savedUser; // Devolver el usuario guardado
    }
    catch (error) {
        console.error('Error al guardar el usuario:', error);
        throw error;
    }
};
exports.registerUserService = registerUserService;
//* Servicio para crear MANAGER
const registerManagerService = async (managerData) => {
    try {
        if (!managerData.email || !managerData.nombre || !managerData.apellido || !managerData.password) {
            throw new Error('Faltan campos obligatorios para registrar al manager');
        }
        ;
        // Crear un nuevo usuario con el token de verificación de email
        const newUserManager = new User_model_1.default({
            ...managerData,
            email: managerData.email,
            nombre: managerData.nombre,
            apellido: managerData.apellido,
            password: managerData.password,
            emailToken: crypto_1.default.randomBytes(64).toString("hex"),
            role: 'manager',
        });
        console.log('Guardando nuevo usuario:', newUserManager);
        // Guardar el usuario en la base de datos
        const savedUser = await newUserManager.save();
        // Generar el link de verificación de email
        const verificationLink = `http://localhost:8081/api/auth/verify-email?token=${newUserManager.emailToken}`;
        // Enviar el correo de verificación al usuario
        await (0, email_service_1.sendEmailService)({
            to: managerData.email,
            subject: 'Verifica tu email',
            text: `Hola ${managerData.nombre},\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
            html: `<h1>Hola ${managerData.nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
        });
        console.log('Usuario guardado:', savedUser);
        return savedUser; // Devolver el usuario guardado
    }
    catch (error) {
        console.error('Error al guardar el usuario:', error);
        throw error;
    }
};
exports.registerManagerService = registerManagerService;
//* Servicio para login de CUSTOMER
const loginCustomerService = async (email, password) => {
    const user = await User_model_1.default.findOne({ email });
    // Verificar si el usuario existe
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar si el rol es 'customer'
    if (user.role !== 'customer') {
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
exports.loginCustomerService = loginCustomerService;
//* Servicio para login de MANAGER
const loginManagerService = async (email, password) => {
    const user = await User_model_1.default.findOne({ email });
    // Verificar si el usuario existe
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar si el rol es 'manager'
    if (user.role !== 'manager') {
        throw new Error('El usuario no tiene permisos para iniciar sesión como manager');
    }
    // Verificar la contraseña
    const isMatch = await (0, auth_service_1.comparePasswordService)(password, user.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }
    // Generar token JWT si la autenticación es correcta
    const token = jsonwebtoken_1.default.sign({ id: user._id, role: user.role, emailp: user.email }, process.env.JWT_SECRET, { expiresIn: '10h' });
    return { token, user };
};
exports.loginManagerService = loginManagerService;
//**Servicio para obtener los datos del usuario**
const getUserDataService = async (userId) => {
    try {
        // Buscar el usuario excluyendo información sensible y optimizar con `.lean()`
        const user = await User_model_1.default.findById(userId)
            .select("-password -emailToken -isVerified")
            .lean();
        if (!user) {
            throw new Error("Usuario no encontrado");
        }
        return user;
    }
    catch (error) {
        console.error("Error obteniendo datos del usuario:", error);
        throw new Error("Error al obtener los datos del usuario");
    }
};
exports.getUserDataService = getUserDataService;
// Servicio para actualizar los datos del usuario
const updateUserDataService = async (userData) => {
    try {
        // Buscar el usuario por su email 
        const user = await User_model_1.default.findOne({ email: userData.email });
        if (!user) {
            throw new Error('Usuario no encontrado');
        }
        // Actualizar solo los campos permitidos
        user.phone = userData.phone || user.phone;
        user.addresses = userData.addresses || user.addresses;
        user.profileImage = userData.profileImage || user.profileImage;
        // Condición especial: La fecha de nacimiento solo puede ser modificada una vez
        if (!user.dob && userData.dob) {
            user.dob = userData.dob;
        }
        // Guardar los cambios en la base de datos
        const updatedUser = await user.save();
        return updatedUser;
    }
    catch (error) {
        console.error('Error al actualizar los datos del usuario:', error);
        throw error;
    }
};
exports.updateUserDataService = updateUserDataService;
const getUserByIDService = async (userId) => {
    try {
        const user = await User_model_1.default.findById(userId);
        return user;
    }
    catch (error) {
        console.error("Error al obtener usuario por ID:", error);
        throw new Error("Error interno del servidor");
    }
};
exports.getUserByIDService = getUserByIDService;
