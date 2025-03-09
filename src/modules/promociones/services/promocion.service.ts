import { PromotionRepository } from "../repositories/promotion.repository";
import { IPromotion } from "@delatte/shared/interfaces/IPromotion";

// ✅ Crear una promoción
export const createPromotionService = async (promotionData: Partial<IPromotion>) => {
  return await PromotionRepository.createPromotion(promotionData);
};

// ✅ Obtener todas las promociones activas de un restaurante
export const getPromotionsByRestaurantService = async (restaurantId: string) => {
  return await PromotionRepository.getPromotionsByRestaurant(restaurantId);
};

// ✅ Actualizar una promoción específica
export const updatePromotionService = async (promoId: string, updateData: Partial<IPromotion>) => {
  return await PromotionRepository.updatePromotion(promoId, updateData);
};

// ✅ Eliminar una promoción específica
export const deletePromotionService = async (promoId: string) => {
  return await PromotionRepository.deletePromotion(promoId);
};
