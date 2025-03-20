"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionsAnalyticsModule = void 0;
const inversify_1 = require("inversify");
const promotionStats_repository_1 = require("../repositories/promotionStats.repository");
const promotionAnalytics_service_1 = require("../services/promotionAnalytics.service");
const promotionAnalytics_types_1 = require("../types/promotionAnalytics.types");
exports.promotionsAnalyticsModule = new inversify_1.ContainerModule((bind) => {
    bind(promotionAnalytics_types_1.PROMOTIONS_ANALYTICS_TYPES.IPromotionStatsRepository).to(promotionStats_repository_1.PromotionStatsRepository);
    bind(promotionAnalytics_types_1.PROMOTIONS_ANALYTICS_TYPES.IPromotionAnalyticsService).to(promotionAnalytics_service_1.PromotionAnalyticsService);
});
