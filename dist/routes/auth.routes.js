"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const rateLimiter_middlware_1 = require("../middlewares/rateLimiter.middlware");
const router = express_1.default.Router();
// Rutas de autenticación
router.post('/register', usuario_controller_1.registrarUsuarioController);
router.get('/verify-email', usuario_controller_1.verificarEmailController);
router.post('/login-customer', rateLimiter_middlware_1.loginRateLimiter, usuario_controller_1.loginCustomerController);
router.post('/login-manager', rateLimiter_middlware_1.loginRateLimiter, usuario_controller_1.loginManagerController);
router.put('/change-password', auth_middleware_1.authMiddleware, usuario_controller_1.cambiarContrasenaController);
router.post('/request-password-reset', usuario_controller_1.requestPasswordResetController);
router.post('/password-reset', usuario_controller_1.resetPasswordController);
exports.default = router;
