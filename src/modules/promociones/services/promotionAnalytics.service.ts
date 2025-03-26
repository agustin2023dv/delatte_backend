import { injectable, inject } from "inversify";
import { IPromotionAnalyticsService } from "../interfaces/IPromotionAnalyticsService";
import { PROMOTIONS_ANALYTICS_TYPES } from "../types/promotionAnalytics.types";
import {
  IPromotionCountByStatusDTO,
  ITopRestaurantsByPromotionsDTO,
  IPromotionImpactDTO,
  IIneffectivePromotionDTO,
} from "@delatte/shared/dtos";
import { IPromotionAnalyticsRepository } from "../interfaces/IPromotionAnalyticsRepository";

@injectable()
export class PromotionAnalyticsService implements IPromotionAnalyticsService {

  constructor(
    @inject(PROMOTIONS_ANALYTICS_TYPES.IPromotionStatsRepository)
    private promotionStatsRepo: IPromotionAnalyticsRepository
  ) {}

  async getPromotionCount(): Promise<IPromotionCountByStatusDTO[]> {
    return await this.promotionStatsRepo.getPromotionCount();
  }

  async getTopRestaurantsByPromotions(): Promise<ITopRestaurantsByPromotionsDTO[]> {
    return await this.promotionStatsRepo.getTopRestaurantsByPromotions();
  }

  async getPromotionImpact(): Promise<IPromotionImpactDTO[]> {
    return await this.promotionStatsRepo.getPromotionImpact();
  }

  async getIneffectivePromotions(): Promise<IIneffectivePromotionDTO[]> {
    return await this.promotionStatsRepo.getIneffectivePromotions();
  }
}
