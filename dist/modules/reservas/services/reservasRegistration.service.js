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
exports.ReservationRegistrationService = void 0;
const inversify_1 = require("inversify");
const reservationBase_types_1 = require("../types/reservationBase.types");
const mongoose_1 = require("mongoose");
let ReservationRegistrationService = class ReservationRegistrationService {
    reservationRepo;
    constructor(reservationRepo) {
        this.reservationRepo = reservationRepo;
    }
    toObjectId(id) {
        return new mongoose_1.Types.ObjectId(id);
    }
    async createCustomerReservation(userId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) {
        const restaurant = await this.reservationRepo.restaurantExists(restauranteId);
        if (!restaurant)
            throw new Error("Restaurante no encontrado");
        return await this.reservationRepo.createReservation({
            usuario: this.toObjectId(userId),
            restaurante: this.toObjectId(restauranteId),
            fecha,
            horario,
            numAdultos,
            numNinos,
            pedidosEspeciales,
            estado: "Confirmada",
        });
    }
    async createManagerReservation(managerId, clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) {
        const restaurant = await this.reservationRepo.restaurantExists(restauranteId);
        if (!restaurant)
            throw new Error("Restaurante no encontrado");
        // Validación de permisos
        const isManager = restaurant.management.managerPrincipal?.toString() === managerId;
        const isCoManager = restaurant.management.coManagers?.some((coManager) => coManager.toString() === managerId);
        if (!isManager && !isCoManager) {
            throw new Error("No puedes crear reservas en un restaurante que no administras");
        }
        return await this.reservationRepo.createReservation({
            usuario: this.toObjectId(clienteId),
            restaurante: this.toObjectId(restauranteId),
            fecha,
            horario,
            numAdultos,
            numNinos,
            pedidosEspeciales,
            estado: "Confirmada",
        });
    }
    async createSuperadminReservation(clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) {
        return await this.reservationRepo.createReservation({
            usuario: this.toObjectId(clienteId),
            restaurante: this.toObjectId(restauranteId),
            fecha,
            horario,
            numAdultos,
            numNinos,
            pedidosEspeciales,
            estado: "Confirmada",
        });
    }
};
exports.ReservationRegistrationService = ReservationRegistrationService;
exports.ReservationRegistrationService = ReservationRegistrationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(reservationBase_types_1.RESERVATIONS_BASE_TYPES.IReservationBaseRepository)),
    __metadata("design:paramtypes", [Object])
], ReservationRegistrationService);
