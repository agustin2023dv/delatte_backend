import { ContainerModule } from "inversify";
import { IPromotionAnalyticsService } from "../interfaces/IPromotionAnalyticsService";
import { IPromotionStatsRepository } from "../interfaces/IPromotionStatsRepository";
import { PromotionStatsRepository } from "../repositories/promotionStats.repository";
import { PromotionAnalyticsService } from "../services/promotionAnalytics.service";
import { PROMOTIONS_ANALYTICS_TYPES } from "../types/promotionAnalytics.types";


export const promotionsAnalyticsModule = new ContainerModule((bind) => {
bind<IPromotionStatsRepository>(PROMOTIONS_ANALYTICS_TYPES.IPromotionStatsRepository).to(PromotionStatsRepository);
bind<IPromotionAnalyticsService>(PROMOTIONS_ANALYTICS_TYPES.IPromotionAnalyticsService).to(PromotionAnalyticsService);
})