import { injectable } from "inversify";
import Promocion from "../models/Promocion.model";
import { IPromotionBaseRepository } from "../interfaces/IPromotionBaseRepository";
import { IPromotion } from "@delatte/shared/interfaces/Promotion/IPromotion";

@injectable()
export class PromotionBaseRepository implements IPromotionBaseRepository {

    async createPromotion(promotionData: Partial<IPromotion>): Promise<IPromotion> {
        return await Promocion.create(promotionData);
    }

    async getPromotionsByRestaurant(restaurantId: string): Promise<IPromotion[]> {
        return await Promocion.find({ restaurante: restaurantId, estado: "activa" }).sort({ fechaInicio: 1 });
    }

    async updatePromotion(promoId: string, updateData: Partial<IPromotion>): Promise<IPromotion | null> {
        return await Promocion.findByIdAndUpdate(promoId, updateData, { new: true });
    }

    async deletePromotion(promoId: string): Promise<IPromotion | null> {
        return await Promocion.findByIdAndDelete(promoId);
    }
}
