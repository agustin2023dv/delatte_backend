export interface IPromotionAnalyticsService {
    getPromotionCount(): Promise<any>;
    getTopRestaurantsByPromotions(): Promise<any>;
    getPromotionImpact(): Promise<any>;
    getIneffectivePromotions(): Promise<any>;
}
