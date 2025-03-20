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
exports.ReviewAnalyticsService = void 0;
const inversify_1 = require("inversify");
const reviewAnalytics_types_1 = require("../types/reviewAnalytics.types");
let ReviewAnalyticsService = class ReviewAnalyticsService {
    reviewStatsRepo;
    constructor(reviewStatsRepo) {
        this.reviewStatsRepo = reviewStatsRepo;
    }
    async getReviewSentimentStats() {
        return await this.reviewStatsRepo.getReviewSentimentStats();
    }
    async getAverageReview(groupBy) {
        return await this.reviewStatsRepo.getAverageReview(groupBy);
    }
    async getReportedReviews() {
        return await this.reviewStatsRepo.getReportedReviews();
    }
};
exports.ReviewAnalyticsService = ReviewAnalyticsService;
exports.ReviewAnalyticsService = ReviewAnalyticsService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(reviewAnalytics_types_1.REVIEWS_ANALYTICS_TYPES.IReviewStatsRepository)),
    __metadata("design:paramtypes", [Object])
], ReviewAnalyticsService);
