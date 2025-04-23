import { ICreatePromotionDTO, IUpdatePromotionDTO } from "@delatte/shared/dtos"; 
import { injectable } from "inversify";
import Promotion from "../models/Promocion.model";
import { IPromotion } from "@delatte/shared/interfaces";
import { IPromotionBaseRepository } from "../interfaces/IPromotionBaseRepository";

@injectable()
export class PromotionBaseRepository implements IPromotionBaseRepository {
  async createPromotion(promotionData: ICreatePromotionDTO): Promise<IPromotion> {
    return await Promotion.create(promotionData);
  }

  async getPromotionsByRestaurant(restaurantId: string): Promise<IPromotion[]> {
    return await Promotion.find({ restaurante: restaurantId, estado: "activa" }).sort({ fechaInicio: 1 });
  }

  async updatePromotion(promoId: string, updateData: IUpdatePromotionDTO): Promise<IPromotion | null> {
    return await Promotion.findByIdAndUpdate(promoId, updateData, { new: true });
  }

  async deletePromotion(promoId: string): Promise<IPromotion | null> {
    return await Promotion.findByIdAndDelete(promoId);
  }

  async getActivePromotions(page = 1, limit = 10): Promise<IPromotion[]> {
    const skip = (page - 1) * limit;
    return await Promotion.find({ estado: 'activa' })
      .sort({ fechaInicio: 1 })
      .skip(skip)
      .limit(limit);
  }
  
  
}
