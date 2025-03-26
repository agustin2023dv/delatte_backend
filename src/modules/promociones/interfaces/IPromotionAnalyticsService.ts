import {
  IPromotionCountByStatusDTO,
  ITopRestaurantsByPromotionsDTO,
  IPromotionImpactDTO,
  IIneffectivePromotionDTO,
} from "@delatte/shared/dtos"; // Ajustá el path real si hace falta

export interface IPromotionAnalyticsService {
  getPromotionCount(): Promise<IPromotionCountByStatusDTO[]>;
  getTopRestaurantsByPromotions(): Promise<ITopRestaurantsByPromotionsDTO[]>;
  getPromotionImpact(): Promise<IPromotionImpactDTO[]>;
  getIneffectivePromotions(): Promise<IIneffectivePromotionDTO[]>;
}
