"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractResetTokenMiddleware = exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_model_1 = __importDefault(require("../modules/usuarios/models/User.model"));
const authMiddleware = async (req, res, next) => {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        res.status(401).json({ message: "No se proporcionó un token de autenticación" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const user = await User_model_1.default.findById(decoded.id);
        if (!user) {
            res.status(401).json({ message: "Token inválido" });
            return;
        }
        req.user = user;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Token inválido o expirado", error: error instanceof Error ? error.message : "Error desconocido" });
    }
};
exports.authMiddleware = authMiddleware;
const extractResetTokenMiddleware = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Token no proporcionado o inválido' });
    }
    const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
    req.body.token = token; // Agregar el token al cuerpo para su uso posterior
    next();
};
exports.extractResetTokenMiddleware = extractResetTokenMiddleware;
