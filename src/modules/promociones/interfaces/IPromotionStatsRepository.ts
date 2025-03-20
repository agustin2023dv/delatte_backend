export interface IPromotionStatsRepository {
    getPromotionCount(): Promise<any>;
    getTopRestaurantsByPromotions(): Promise<any>;
    getPromotionImpact(): Promise<any>;
    getIneffectivePromotions(): Promise<any>;
}
