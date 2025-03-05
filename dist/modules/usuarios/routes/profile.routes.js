"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usuario_controller_1 = require("../controllers/usuario.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const router = express_1.default.Router();
// Rutas relacionadas con el perfil del usuario
router.get('/', auth_middleware_1.authMiddleware, usuario_controller_1.getUserProfileController);
router.put('/', auth_middleware_1.authMiddleware, usuario_controller_1.updateUserDataController);
router.get('/:id', auth_middleware_1.authMiddleware, usuario_controller_1.getUserByIDController);
exports.default = router;
