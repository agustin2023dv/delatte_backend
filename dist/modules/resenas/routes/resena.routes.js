"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resena_controller_1 = require("../controllers/resena.controller");
const utils_1 = require("@delatte/shared/utils");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
const router = express_1.default.Router();
// 🔹 Obtener todas las reseñas (Solo Superadmin)
router.get('/', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['superadmin']), resena_controller_1.getAllReviewsController);
// 🔹 Obtener reseñas por restaurante
router.get('/restaurantId/:id', auth_middleware_1.authMiddleware, resena_controller_1.getReviewsByRestaurantController);
// 🔹 Obtener reseñas por usuario
router.get('/userId/:id', auth_middleware_1.authMiddleware, resena_controller_1.getReviewsByUserController);
// 🔹 Crear una nueva reseña (Solo clientes pueden dejar reseñas)
router.post('/create-review', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['customer']), utils_1.validateReview, resena_controller_1.createReviewController);
// 🔹 Editar una reseña (Solo clientes pueden editar sus reseñas)
router.put('/:id', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['customer']), utils_1.validateReviewUpdate, resena_controller_1.updateReviewController);
// 🔹 Borrar una reseña (Clientes pueden borrar su reseña / Superadmin puede borrar cualquier reseña)
router.delete('/:id/delete', auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(['customer', 'superadmin']), resena_controller_1.deleteReviewController);
exports.default = router;
