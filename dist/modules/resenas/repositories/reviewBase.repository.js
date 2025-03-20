"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewBaseRepository = void 0;
const inversify_1 = require("inversify");
const Review_model_1 = require("../models/Review.model");
let ReviewBaseRepository = class ReviewBaseRepository {
    async createReview(userId, reviewData) {
        return await Review_model_1.Review.create({ usuario: userId, ...reviewData });
    }
    async getAllReviews(page = 1, limit = 10) {
        return await Review_model_1.Review.find().skip((page - 1) * limit).limit(limit);
    }
    async getReviewsByRestaurant(restaurantId) {
        return await Review_model_1.Review.find({ restaurante: restaurantId });
    }
    async getReviewsByUser(userId) {
        return await Review_model_1.Review.find({ usuario: userId });
    }
    async updateReview(reviewId, reviewData) {
        return await Review_model_1.Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
    }
    async deleteReview(reviewId) {
        await Review_model_1.Review.findByIdAndDelete(reviewId);
    }
};
exports.ReviewBaseRepository = ReviewBaseRepository;
exports.ReviewBaseRepository = ReviewBaseRepository = __decorate([
    (0, inversify_1.injectable)()
], ReviewBaseRepository);
