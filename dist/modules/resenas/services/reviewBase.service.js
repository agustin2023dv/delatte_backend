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
exports.ReviewBaseService = void 0;
const inversify_1 = require("inversify");
const reviewBase_types_1 = require("../types/reviewBase.types");
let ReviewBaseService = class ReviewBaseService {
    reviewRepo;
    constructor(reviewRepo) {
        this.reviewRepo = reviewRepo;
    }
    async createReview(userId, reviewData) {
        return await this.reviewRepo.createReview(userId, reviewData);
    }
    async getAllReviews(page = 1, limit = 10) {
        return await this.reviewRepo.getAllReviews(page, limit);
    }
    async getReviewsByRestaurant(restaurantId) {
        return await this.reviewRepo.getReviewsByRestaurant(restaurantId);
    }
    async getReviewsByUser(userId) {
        return await this.reviewRepo.getReviewsByUser(userId);
    }
    async updateReview(reviewId, reviewData) {
        return await this.reviewRepo.updateReview(reviewId, reviewData);
    }
    async deleteReview(reviewId) {
        return await this.reviewRepo.deleteReview(reviewId);
    }
};
exports.ReviewBaseService = ReviewBaseService;
exports.ReviewBaseService = ReviewBaseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(reviewBase_types_1.REVIEWS_BASE_TYPES.IReviewBaseRepository)),
    __metadata("design:paramtypes", [Object])
], ReviewBaseService);
