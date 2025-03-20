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
exports.RestaurantStatsRepository = void 0;
const inversify_1 = require("inversify");
const Restaurant_model_1 = __importDefault(require("../models/Restaurant.model"));
let RestaurantStatsRepository = class RestaurantStatsRepository {
    async getTopRestaurants() {
        return await Restaurant_model_1.default.find()
            .sort({ totalReservas: -1, calificacion: -1 })
            .limit(10);
    }
    async getWorstPerformingRestaurants() {
        return await Restaurant_model_1.default.find()
            .sort({ totalReservas: 1, calificacion: 1 })
            .limit(10);
    }
    async getNewRestaurants() {
        return await Restaurant_model_1.default.find()
            .sort({ _id: -1 })
            .limit(10);
    }
    async getSaturatedRestaurants() {
        try {
            return await Restaurant_model_1.default.aggregate([
                {
                    $project: {
                        nombre: 1,
                        direccion: 1,
                        totalReservas: 1,
                        capacidadMesas: 1,
                        capacidadTotal: {
                            $sum: {
                                $map: {
                                    input: "$capacidadMesas",
                                    as: "mesa",
                                    in: { $multiply: ["$$mesa.cantidad", "$$mesa.personasPorMesa"] },
                                },
                            },
                        },
                    },
                },
                {
                    $addFields: {
                        saturacion: {
                            $cond: [
                                { $gt: ["$capacidadTotal", 0] },
                                { $divide: ["$totalReservas", "$capacidadTotal"] },
                                0,
                            ],
                        },
                    },
                },
                { $sort: { saturacion: -1 } },
                { $limit: 10 },
            ]);
        }
        catch (error) {
            console.error("Error al calcular restaurantes saturados:", error);
            throw error;
        }
    }
};
exports.RestaurantStatsRepository = RestaurantStatsRepository;
exports.RestaurantStatsRepository = RestaurantStatsRepository = __decorate([
    (0, inversify_1.injectable)()
], RestaurantStatsRepository);
