import { injectable, inject } from "inversify";
import { IPromotionAnalyticsService } from "../interfaces/IPromotionAnalyticsService";
import { IPromotionStatsRepository } from "../interfaces/IPromotionStatsRepository";
import { PROMOTIONS_ANALYTICS_TYPES } from "../types/promotionAnalytics.types";

@injectable()
export class PromotionAnalyticsService implements IPromotionAnalyticsService {

    constructor(@inject(PROMOTIONS_ANALYTICS_TYPES.IPromotionStatsRepository) private promotionStatsRepo: IPromotionStatsRepository) {}

    async getPromotionCount() {
        return await this.promotionStatsRepo.getPromotionCount();
    }

    async getTopRestaurantsByPromotions() {
        return await this.promotionStatsRepo.getTopRestaurantsByPromotions();
    }

    async getPromotionImpact() {
        return await this.promotionStatsRepo.getPromotionImpact();
    }

    async getIneffectivePromotions() {
        return await this.promotionStatsRepo.getIneffectivePromotions();
    }
}
