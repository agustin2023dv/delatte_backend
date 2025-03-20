import { inject, injectable } from "inversify";
import { IPromotionStatsRepository } from "../interfaces/IPromotionStatsRepository";
import { PROMOTIONS_ANALYTICS_TYPES } from "../types/promotionAnalytics.types";

@injectable()
export class PromotionAnalyticsService {
  constructor(
    @inject(PROMOTIONS_ANALYTICS_TYPES.IPromotionStatsRepository)
    private promotionStatsRepository: IPromotionStatsRepository
  ) {}

  // ✅ Cantidad de promociones por estado
  async getPromotionCountService() {
    return await this.promotionStatsRepository.getPromotionCount();
  }

  // ✅ Restaurantes con más promociones creadas
  async getTopRestaurantsByPromotionsService() {
    return await this.promotionStatsRepository.getTopRestaurantsByPromotions();
  }

  // ✅ Impacto de promociones en reservas
  async getPromotionImpactService() {
    return await this.promotionStatsRepository.getPromotionImpact();
  }

  // ✅ Promociones inefectivas (sin reservas)
  async getIneffectivePromotionsService() {
    return await this.promotionStatsRepository.getIneffectivePromotions();
  }
}
