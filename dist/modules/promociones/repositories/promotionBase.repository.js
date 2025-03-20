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
exports.PromotionBaseRepository = void 0;
const inversify_1 = require("inversify");
const Promocion_model_1 = __importDefault(require("../models/Promocion.model"));
let PromotionBaseRepository = class PromotionBaseRepository {
    async createPromotion(promotionData) {
        return await Promocion_model_1.default.create(promotionData);
    }
    async getPromotionsByRestaurant(restaurantId) {
        return await Promocion_model_1.default.find({ restaurante: restaurantId, estado: "activa" }).sort({ fechaInicio: 1 });
    }
    async updatePromotion(promoId, updateData) {
        return await Promocion_model_1.default.findByIdAndUpdate(promoId, updateData, { new: true });
    }
    async deletePromotion(promoId) {
        return await Promocion_model_1.default.findByIdAndDelete(promoId);
    }
};
exports.PromotionBaseRepository = PromotionBaseRepository;
exports.PromotionBaseRepository = PromotionBaseRepository = __decorate([
    (0, inversify_1.injectable)()
], PromotionBaseRepository);
