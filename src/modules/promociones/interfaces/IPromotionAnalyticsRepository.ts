import {
    IPromotionCountByStatusDTO,
    ITopRestaurantsByPromotionsDTO,
    IPromotionImpactDTO,
    IIneffectivePromotionDTO,
  } from "@delatte/shared/dtos"; 
  
  export interface IPromotionAnalyticsRepository {
    getPromotionCount(): Promise<IPromotionCountByStatusDTO[]>;
    getTopRestaurantsByPromotions(): Promise<ITopRestaurantsByPromotionsDTO[]>;
    getPromotionImpact(): Promise<IPromotionImpactDTO[]>;
    getIneffectivePromotions(): Promise<IIneffectivePromotionDTO[]>;
  }
  