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
exports.ReservationAnalyticsController = void 0;
const inversify_express_utils_1 = require("inversify-express-utils");
const inversify_1 = require("inversify");
const reservationAnalytics_types_1 = require("../types/reservationAnalytics.types");
let ReservationAnalyticsController = class ReservationAnalyticsController {
    reservationAnalyticsService;
    constructor(reservationAnalyticsService) {
        this.reservationAnalyticsService = reservationAnalyticsService;
    }
    async getReservasDiarias(req, res) {
        try {
            const data = await this.reservationAnalyticsService.getReservasDiarias();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener reservas diarias", error });
        }
    }
    async getReservasSemanales(req, res) {
        try {
            const data = await this.reservationAnalyticsService.getReservasSemanales();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener reservas semanales", error });
        }
    }
    async getReservasMensuales(req, res) {
        try {
            const data = await this.reservationAnalyticsService.getReservasMensuales();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener reservas mensuales", error });
        }
    }
    async getReservasPorRestaurante(req, res) {
        try {
            const data = await this.reservationAnalyticsService.getReservasPorRestaurante();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener reservas por restaurante", error });
        }
    }
    async getReservasCanceladas(req, res) {
        try {
            const data = await this.reservationAnalyticsService.getReservasCanceladas();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener reservas canceladas", error });
        }
    }
    async getTopHorarios(req, res) {
        try {
            const data = await this.reservationAnalyticsService.getTopHorarios();
            res.status(200).json(data);
        }
        catch (error) {
            res.status(500).json({ message: "Error al obtener los horarios con más reservas", error });
        }
    }
};
exports.ReservationAnalyticsController = ReservationAnalyticsController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/daily"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationAnalyticsController.prototype, "getReservasDiarias", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/weekly"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationAnalyticsController.prototype, "getReservasSemanales", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/monthly"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationAnalyticsController.prototype, "getReservasMensuales", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/by-restaurant"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationAnalyticsController.prototype, "getReservasPorRestaurante", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/canceled"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationAnalyticsController.prototype, "getReservasCanceladas", null);
__decorate([
    (0, inversify_express_utils_1.httpGet)("/top-hours"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ReservationAnalyticsController.prototype, "getTopHorarios", null);
exports.ReservationAnalyticsController = ReservationAnalyticsController = __decorate([
    (0, inversify_express_utils_1.controller)("/api/v1/reservations/analytics"),
    __param(0, (0, inversify_1.inject)(reservationAnalytics_types_1.RESERVATIONS_ANAYLITICS_TYPES.IReservationAnalyticsService)),
    __metadata("design:paramtypes", [Object])
], ReservationAnalyticsController);
