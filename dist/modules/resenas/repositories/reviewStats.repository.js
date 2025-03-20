"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewStatsRepository = void 0;
const inversify_1 = require("inversify");
const Review_model_1 = require("../models/Review.model");
let ReviewStatsRepository = class ReviewStatsRepository {
    async getReviewSentimentStats() {
        return await Review_model_1.Review.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m", date: "$fecha" } },
                    positivas: { $sum: { $cond: [{ $gte: ["$calificacion", 4] }, 1, 0] } },
                    negativas: { $sum: { $cond: [{ $lte: ["$calificacion", 2] }, 1, 0] } },
                    neutras: { $sum: { $cond: [{ $eq: ["$calificacion", 3] }, 1, 0] } },
                    total: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);
    }
    async getAverageReview(groupBy) {
        const matchStage = groupBy === "restaurant" ? { restaurante: "$restaurante" } : { usuario: "$usuario" };
        return await Review_model_1.Review.aggregate([
            {
                $group: {
                    _id: matchStage,
                    promedioCalificacion: { $avg: "$calificacion" }
                }
            },
            { $sort: { promedioCalificacion: -1 } }
        ]);
    }
    async getReportedReviews() {
        return await Review_model_1.Review.find({ status: "reported" })
            .populate("usuario", "nombre apellido email")
            .populate("restaurante", "nombre direccion")
            .sort({ fecha: -1 });
    }
};
exports.ReviewStatsRepository = ReviewStatsRepository;
exports.ReviewStatsRepository = ReviewStatsRepository = __decorate([
    (0, inversify_1.injectable)()
], ReviewStatsRepository);
