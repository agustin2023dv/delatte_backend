import Promocion from "../models/Promocion.model";
import { IPromotion } from "@delatte/shared/interfaces/IPromotion";

export class PromotionRepository {
  // 📌 Crear una promoción
  static async createPromotion(promotionData: Partial<IPromotion>): Promise<IPromotion> {
    return await Promocion.create(promotionData);
  }

  // 📌 Obtener todas las promociones activas de un restaurante
  static async getPromotionsByRestaurant(restaurantId: string): Promise<IPromotion[]> {
    return await Promocion.find({ restaurante: restaurantId, estado: "activa" }).sort({ fechaInicio: 1 });
  }

  // 📌 Actualizar una promoción específica
  static async updatePromotion(promoId: string, updateData: Partial<IPromotion>): Promise<IPromotion | null> {
    return await Promocion.findByIdAndUpdate(promoId, updateData, { new: true });
  }

  // 📌 Eliminar una promoción específica
  static async deletePromotion(promoId: string): Promise<IPromotion | null> {
    return await Promocion.findByIdAndDelete(promoId);
  }
}
