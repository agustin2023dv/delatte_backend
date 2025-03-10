import { PromotionStatsRepository } from "../repositories/promotionStats.repository";

export class PromotionAnalyticsService {

  //* 📊 Cantidad de promociones por estado
  static async getPromotionCount() {
    return await PromotionStatsRepository.getPromotionCount();
  }

  //* 📊 Restaurantes con más promociones creadas
  static async getTopRestaurantsByPromotions() {
    return await PromotionStatsRepository.getTopRestaurantsByPromotions();
  }

  //* 📊 Impacto de promociones en reservas
  static async getPromotionImpact() {
    return await PromotionStatsRepository.getPromotionImpact();
  }

  //* 📊 Promociones inefectivas (sin reservas)
  static async getIneffectivePromotions() {
    return await PromotionStatsRepository.getIneffectivePromotions();
  }
}
