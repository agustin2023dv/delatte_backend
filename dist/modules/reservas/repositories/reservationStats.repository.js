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
exports.ReservationStatsRepository = void 0;
const inversify_1 = require("inversify");
const Reservation_model_1 = __importDefault(require("../models/Reservation.model"));
let ReservationStatsRepository = class ReservationStatsRepository {
    //* 📊 Cantidad de reservas por día
    async getReservasDiarias() {
        return await Reservation_model_1.default.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } }, total: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
    }
    //* 📊 Cantidad de reservas por semana
    async getReservasSemanales() {
        return await Reservation_model_1.default.aggregate([
            { $group: { _id: { $isoWeek: "$fecha" }, total: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
    }
    //* 📊 Cantidad de reservas por mes
    async getReservasMensuales() {
        return await Reservation_model_1.default.aggregate([
            { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$fecha" } }, total: { $sum: 1 } } },
            { $sort: { _id: 1 } }
        ]);
    }
    //* 📊 Cantidad de reservas por restaurante
    async getReservasPorRestaurante() {
        return await Reservation_model_1.default.aggregate([
            { $group: { _id: "$restaurante", total: { $sum: 1 } } },
            { $sort: { total: -1 } }
        ]);
    }
    //* 📊 Obtener listado de reservas canceladas con motivo
    async getReservasCanceladas() {
        return await Reservation_model_1.default.find({ estado: "Cancelada" }, { _id: 0, motivo: 1, fecha: 1 });
    }
    //* 📊 Obtener los horarios con más reservas
    async getTopHorarios() {
        return await Reservation_model_1.default.aggregate([
            { $group: { _id: "$horario", total: { $sum: 1 } } },
            { $sort: { total: -1 } },
            { $limit: 5 }
        ]);
    }
};
exports.ReservationStatsRepository = ReservationStatsRepository;
exports.ReservationStatsRepository = ReservationStatsRepository = __decorate([
    (0, inversify_1.injectable)()
], ReservationStatsRepository);
