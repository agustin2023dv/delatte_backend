"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationBaseController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const reservationBase_types_1 = require("../types/reservationBase.types");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
const reservation_middleware_1 = require("../../../middlewares/reservation.middleware");
let ReservationBaseController = class ReservationBaseController extends inversify_express_utils_1.BaseHttpController {
    reservationBaseService;
    reservationRegisterService;
    constructor(reservationBaseService, reservationRegisterService) {
        super();
        this.reservationBaseService = reservationBaseService;
        this.reservationRegisterService = reservationRegisterService;
    }
    // 📌 Crear una nueva reserva
    async createReservation(req, res) {
        try {
            const userId = req.user.id;
            const { restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales, clienteId } = req.body;
            const userRole = req.user.role;
            if (!restauranteId || !fecha || !horario || numAdultos < 1) {
                res.status(400).json({ message: "Datos insuficientes para crear la reserva" });
                return;
            }
            let reserva;
            if (userRole === "customer") {
                if (clienteId && clienteId !== userId) {
                    res.status(403).json({ message: "No puedes reservar en nombre de otro usuario" });
                    return;
                }
                reserva = await this.reservationRegisterService.createCustomerReservation(userId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
            }
            else if (userRole === "manager") {
                reserva = await this.reservationRegisterService.createManagerReservation(userId, clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
            }
            else if (userRole === "superadmin") {
                reserva = await this.reservationRegisterService.createSuperadminReservation(clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
            }
            else {
                res.status(403).json({ message: "No tienes permisos para crear una reserva" });
                return;
            }
            res.status(201).json(reserva);
        }
        catch (error) {
            console.error("Error al crear reserva:", error);
            res.status(500).json({ message: "Error interno al crear la reserva", error });
        }
    }
    // 📌 Obtener reservas del usuario autenticado
    async getUserReservations(req, res) {
        try {
            const result = await this.reservationBaseService.getReservationsById(req.user.id, req.user.role);
            res.status(200).json(result.length ? result : { message: "No hay reservas disponibles." });
        }
        catch (error) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
    // 📌 Obtener reservas de un restaurante
    async getReservationsByRestaurant(req, res) {
        try {
            const { id: restaurantId } = req.params;
            const reservations = await this.reservationBaseService.getReservationsByRestaurant(restaurantId);
            res.status(200).json(reservations);
        }
        catch (error) {
            res.status(500).json({ message: "Error obteniendo reservas del restaurante", error });
        }
    }
    // 📌 Obtener reservas de un usuario
    async getReservationsByUser(req, res) {
        try {
            const { id: userId } = req.params;
            const reservations = await this.reservationBaseService.getReservationsByUser(userId);
            res.status(200).json(reservations);
        }
        catch (error) {
            res.status(500).json({ message: "Error obteniendo reservas del usuario", error });
        }
    }
    // 📌 Obtener detalles de una reserva por ID
    async getReservationById(req, res) {
        try {
            const { id: reservationId } = req.params;
            const reservation = await this.reservationBaseService.getReservationById(reservationId);
            if (!reservation) {
                res.status(404).json({ message: "Reserva no encontrada" });
                return;
            }
            res.status(200).json(reservation);
        }
        catch (error) {
            res.status(500).json({ message: "Error obteniendo la reserva", error });
        }
    }
    // 📌 Cancelar una reserva
    async cancelReservation(req, res) {
        try {
            const reservation = await this.reservationBaseService.cancelReservation(req.params.id);
            res.status(200).json({ message: "Reserva cancelada con éxito.", reservation });
        }
        catch (error) {
            res.status(500).json({ message: "Error cancelando la reserva", error });
        }
    }
    // 📌 Modificar una reserva
    async updateReservation(req, res) {
        try {
            const updatedReservation = await this.reservationBaseService.updateReservation(req.params.id, req.body);
            res.status(200).json({ message: "Reserva actualizada con éxito.", updatedReservation });
        }
        catch (error) {
            res.status(500).json({ message: "Error actualizando la reserva", error });
        }
    }
    // 📌 Obtener todas las reservas (solo superadmins)
    async getAllReservations(req, res) {
        try {
            const reservations = await this.reservationBaseService.getAllReservations();
            res.status(200).json(reservations);
        }
        catch (error) {
            res.status(500).json({ message: "Error obteniendo todas las reservas", error });
        }
    }
};
exports.ReservationBaseController = ReservationBaseController;
__decorate([
    (0, inversify_express_utils_1.httpPost)("/", auth_middleware_1.authMiddleware, reservation_middleware_1.validateReservationData, reservation_middleware_1.checkDisponibilidadMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "createReservation", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["customer", "manager"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "getUserReservations", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/restaurant/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin", "manager"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "getReservationsByRestaurant", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/user/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "getReservationsByUser", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/:id", auth_middleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "getReservationById", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id/cancel", auth_middleware_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "cancelReservation", null);
__decorate([
    (0, inversify_express_utils_1.httpPut)("/:id", auth_middleware_1.authMiddleware, reservation_middleware_1.validateReservationData),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "updateReservation", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/all", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"])),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationBaseController.prototype, "getAllReservations", null);
exports.ReservationBaseController = ReservationBaseController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/reservations"),
    __param(0, (0, inversify_1.inject)(reservationBase_types_1.RESERVATIONS_BASE_TYPES.IReservationBaseService)),
    __param(1, (0, inversify_1.inject)(reservationBase_types_1.RESERVATIONS_BASE_TYPES.IReservationRegisterService)),
    __metadata("design:paramtypes", [Object, Object])
], ReservationBaseController);
