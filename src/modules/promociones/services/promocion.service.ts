import { PromotionRepository } from "../repositories/promotion.repository";
import { IPromotion } from "@delatte/shared/interfaces/IPromotion";

export class PromotionService {

  //* ✅ Crear una promoción
  static async createPromotion(promotionData: Partial<IPromotion>) {
    return await PromotionRepository.createPromotion(promotionData);
  }

  //* ✅ Obtener todas las promociones activas de un restaurante
  static async getPromotionsByRestaurant(restaurantId: string) {
    return await PromotionRepository.getPromotionsByRestaurant(restaurantId);
  }

  //* ✅ Actualizar una promoción específica
  static async updatePromotion(promoId: string, updateData: Partial<IPromotion>) {
    return await PromotionRepository.updatePromotion(promoId, updateData);
  }

  //* ✅ Eliminar una promoción específica
  static async deletePromotion(promoId: string) {
    return await PromotionRepository.deletePromotion(promoId);
  }
}
