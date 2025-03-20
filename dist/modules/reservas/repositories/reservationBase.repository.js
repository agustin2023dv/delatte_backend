"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservationBaseRepository = void 0;
const inversify_1 = require("inversify");
const Reservation_model_1 = __importDefault(require("../models/Reservation.model"));
const Restaurant_model_1 = __importDefault(require("../../restaurantes/models/Restaurant.model"));
let ReservationBaseRepository = class ReservationBaseRepository {
    async createReservation(reservationData) {
        return await Reservation_model_1.default.create(reservationData);
    }
    async getReservationById(id) {
        return await Reservation_model_1.default.findById(id)
            .populate("restaurante", "nombre direccion")
            .populate("usuario", "nombre apellido email");
    }
    async getAllReservations() {
        return await Reservation_model_1.default.find()
            .populate("restaurante", "nombre direccion")
            .populate("usuario", "nombre apellido email");
    }
    async getReservationsByUser(userId) {
        return await Reservation_model_1.default.find({ usuario: userId })
            .populate("usuario", "nombre apellido email")
            .populate("restaurante", "nombre direccion");
    }
    async getReservationsByRestaurant(restaurantId) {
        return await Reservation_model_1.default.find({ restaurante: restaurantId })
            .populate("usuario", "nombre apellido email phone");
    }
    async getReservationsByRole(userId, role) {
        if (role === "customer") {
            return await Reservation_model_1.default.find({ usuario: userId })
                .populate("restaurante", "nombre direccion");
        }
        else if (role === "manager") {
            const restaurant = await Restaurant_model_1.default.findOne({ managerPrincipal: userId }).lean();
            if (!restaurant)
                throw new Error("No se encontró restaurante para este manager");
            return await Reservation_model_1.default.find({ restaurante: restaurant._id })
                .populate("usuario", "nombre direccion email");
        }
        else {
            throw new Error("Rol no válido o usuario no encontrado.");
        }
    }
    async updateReservation(reservationId, updatedData) {
        return await Reservation_model_1.default.findByIdAndUpdate(reservationId, updatedData, { new: true });
    }
    async cancelReservation(reservationId) {
        return await Reservation_model_1.default.findByIdAndUpdate(reservationId, { estado: "Cancelada" }, { new: true });
    }
    async restaurantExists(restaurantId) {
        return await Restaurant_model_1.default.findById(restaurantId);
    }
};
exports.ReservationBaseRepository = ReservationBaseRepository;
exports.ReservationBaseRepository = ReservationBaseRepository = __decorate([
    (0, inversify_1.injectable)()
], ReservationBaseRepository);
