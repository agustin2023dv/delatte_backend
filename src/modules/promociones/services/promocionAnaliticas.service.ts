import { PromotionStatsRepository } from "../repositories/promotionStats.repository";


// ✅ Cantidad de promociones por estado
export const getPromotionCountService = async () => {
  return await PromotionStatsRepository.getPromotionCount();
};

// ✅ Restaurantes con más promociones creadas
export const getTopRestaurantsByPromotionsService = async () => {
  return await PromotionStatsRepository.getTopRestaurantsByPromotions();
};

// ✅ Impacto de promociones en reservas
export const getPromotionImpactService = async () => {
  return await PromotionStatsRepository.getPromotionImpact();
};

// ✅ Promociones inefectivas (sin reservas)
export const getIneffectivePromotionsService = async () => {
  return await PromotionStatsRepository.getIneffectivePromotions();
};
