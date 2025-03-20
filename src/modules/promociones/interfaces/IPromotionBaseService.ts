import { IPromotion } from "@delatte/shared/interfaces/Promotion/IPromotion";


export interface IPromotionBaseService {
    createPromotion(promotionData: Partial<IPromotion>): Promise<IPromotion>;
    getPromotionsByRestaurant(restaurantId: string): Promise<IPromotion[]>;
    updatePromotion(promoId: string, updateData: Partial<IPromotion>): Promise<IPromotion | null>;
    deletePromotion(promoId: string): Promise<IPromotion | null>;
}