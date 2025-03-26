import { ContainerModule } from "inversify";
import { IPromotionAnalyticsService } from "../interfaces/IPromotionAnalyticsService";

import { PromotionAnalyticsService } from "../services/promotionAnalytics.service";
import { PROMOTIONS_ANALYTICS_TYPES } from "../types/promotionAnalytics.types";
import { PromotionAnalyticsRepository } from "../repositories/promotionAnalytics.repository";
import { IPromotionAnalyticsRepository } from "../interfaces/IPromotionAnalyticsRepository";


export const promotionsAnalyticsModule = new ContainerModule((bind) => {
bind<IPromotionAnalyticsRepository>(PROMOTIONS_ANALYTICS_TYPES.IPromotionAnalyticsRepository).to(PromotionAnalyticsRepository);
bind<IPromotionAnalyticsService>(PROMOTIONS_ANALYTICS_TYPES.IPromotionAnalyticsService).to(PromotionAnalyticsService);
})