"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsAnalyticsModule = void 0;
const inversify_1 = require("inversify");
const reviewAnalytics_types_1 = require("../types/reviewAnalytics.types");
const reviewStats_repository_1 = require("../repositories/reviewStats.repository");
const resenasAnaliticas_service_1 = require("../services/resenasAnaliticas.service");
exports.reviewsAnalyticsModule = new inversify_1.ContainerModule((bind) => {
    bind(reviewAnalytics_types_1.REVIEWS_ANALYTICS_TYPES.IReviewStatsRepository).to(reviewStats_repository_1.ReviewStatsRepository);
    bind(reviewAnalytics_types_1.REVIEWS_ANALYTICS_TYPES.IReviewAnalyticsService).to(resenasAnaliticas_service_1.ReviewAnalyticsService);
});
