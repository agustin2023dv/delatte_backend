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
exports.PromotionStatsRepository = void 0;
const inversify_1 = require("inversify");
const Promocion_model_1 = __importDefault(require("../models/Promocion.model"));
const Reservation_model_1 = __importDefault(require("../../reservas/models/Reservation.model"));
let PromotionStatsRepository = class PromotionStatsRepository {
    async getPromotionCount() {
        return await Promocion_model_1.default.aggregate([
            {
                $group: {
                    _id: "$estado",
                    cantidad: { $sum: 1 },
                },
            },
        ]);
    }
    async getTopRestaurantsByPromotions() {
        return await Promocion_model_1.default.aggregate([
            {
                $group: {
                    _id: "$restaurante",
                    totalPromociones: { $sum: 1 },
                },
            },
            { $sort: { totalPromociones: -1 } },
            { $limit: 5 },
        ]);
    }
    async getPromotionImpact() {
        return await Reservation_model_1.default.aggregate([
            {
                $match: {
                    promocionAplicada: { $exists: true, $ne: null },
                },
            },
            {
                $group: {
                    _id: "$promocionAplicada",
                    totalReservas: { $sum: 1 },
                },
            },
            { $sort: { totalReservas: -1 } },
        ]);
    }
    async getIneffectivePromotions() {
        return await Promocion_model_1.default.aggregate([
            {
                $lookup: {
                    from: "reservas",
                    localField: "_id",
                    foreignField: "promocionAplicada",
                    as: "reservasRelacionadas",
                },
            },
            {
                $match: {
                    "reservasRelacionadas.0": { $exists: false },
                },
            },
            { $sort: { fechaInicio: -1 } },
        ]);
    }
};
exports.PromotionStatsRepository = PromotionStatsRepository;
exports.PromotionStatsRepository = PromotionStatsRepository = __decorate([
    (0, inversify_1.injectable)()
], PromotionStatsRepository);
