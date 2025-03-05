"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reserva_controller_1 = require("../controllers/reserva.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
const reservation_middleware_1 = require("../../../middlewares/reservation.middleware");
const resena_controller_1 = require("../../resenas/controllers/resena.controller");
const router = express_1.default.Router();
router.post("/", auth_middleware_1.authMiddleware, // Verifica autenticación
reservation_middleware_1.validateReservationData, // Valida los datos de la reserva
reservation_middleware_1.checkDisponibilidadMiddleware, // Verifica disponibilidad del restaurante
reserva_controller_1.createReservationController);
//*Ruta para obtener las reviews del restaurante
router.get('/:id/reviews', resena_controller_1.getReviewsByRestaurantController);
// ✅ Ver reservas del usuario autenticado (clientes y managers)
router.get("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["customer", "manager"]), reserva_controller_1.getUserReservationsController);
// ✅ Obtener reservas de un restaurante (solo superadmins y managers del restaurante)
router.get("/restaurantId/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin", "manager"]), reserva_controller_1.getReservationsByRestaurantController);
// ✅ Obtener reservas de un usuario (solo superadmins)
router.get("/userId/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"]), reserva_controller_1.getReservationsByUserController);
// ✅ Cancelar una reserva
router.put("/cancelar/:id", auth_middleware_1.authMiddleware, reserva_controller_1.cancelReservationController);
// ✅ Modificar una reserva
router.put("/modificar/:id", auth_middleware_1.authMiddleware, reservation_middleware_1.validateReservationData, reserva_controller_1.updateReservationController);
// ✅ Obtener todas las reservas (solo superadmins)
router.get("/all-reservations", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"]), reserva_controller_1.getAllReservationsController);
// ✅ Buscar una reserva por ID
router.get("/:id", auth_middleware_1.authMiddleware, reserva_controller_1.getReservationByIdController);
exports.default = router;
