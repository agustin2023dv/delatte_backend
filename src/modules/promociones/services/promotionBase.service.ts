import { injectable, inject } from "inversify";
import { IPromotionBaseRepository} from "../interfaces/IPromotionBaseRepository";
import { PROMOTIONS_BASE_TYPES } from "../types/promotionBase.types";
import { IPromotion } from "@delatte/shared/interfaces/Promotion/IPromotion";
import { ICreatePromotionDTO, IUpdatePromotionDTO } from "@delatte/shared/dtos";
import { IPromotionBaseService } from "../interfaces/IPromotionBaseService";

@injectable()
export class PromotionBaseService implements IPromotionBaseService {

  constructor(@inject(PROMOTIONS_BASE_TYPES.IPromotionBaseRepository) private promotionRepo: IPromotionBaseRepository) {}

  async createPromotion(promotionData: ICreatePromotionDTO): Promise<IPromotion> {
    return await this.promotionRepo.createPromotion(promotionData);
  }

  async getPromotionsByRestaurant(restaurantId: string): Promise<IPromotion[]> {
    return await this.promotionRepo.getPromotionsByRestaurant(restaurantId);
  }

  async updatePromotion(promoId: string, updateData: IUpdatePromotionDTO): Promise<IPromotion | null> {
    return await this.promotionRepo.updatePromotion(promoId, updateData);
  }

  async deletePromotion(promoId: string): Promise<IPromotion | null> {
    return await this.promotionRepo.deletePromotion(promoId);
  }

  async getActivePromotions(page = 1, limit = 10): Promise<IPromotion[]> {
    return await this.promotionRepo.getActivePromotions(page, limit);
  }
  
  
}
