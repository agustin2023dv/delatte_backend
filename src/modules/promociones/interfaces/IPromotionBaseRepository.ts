import { ICreatePromotionDTO, IUpdatePromotionDTO } from "@delatte/shared/dtos";
import { IPromotion } from "@delatte/shared/interfaces";

export interface IPromotionBaseRepository {
  createPromotion(promotionData: ICreatePromotionDTO): Promise<IPromotion>;
  getPromotionsByRestaurant(restaurantId: string): Promise<IPromotion[]>;
  updatePromotion(promoId: string, updateData: IUpdatePromotionDTO): Promise<IPromotion | null>;
  deletePromotion(promoId: string): Promise<IPromotion | null>;
  getActivePromotions(page?: number, limit?: number): Promise<IPromotion[]>;
}