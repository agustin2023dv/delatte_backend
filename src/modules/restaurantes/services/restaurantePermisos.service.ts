import { ObjectId } from "mongoose";
import Restaurant from "../models/Restaurant.model";

// Servicio para verificar si el usuario es manager o co-manager de un restaurante
export const checkUserRoleInRestaurantService = async (restaurantId: string, userId: string): Promise<boolean> => {
    try {
      const restaurant = await Restaurant.findById(restaurantId);
  
      if (!restaurant) {
        throw new Error('Restaurante no encontrado');
      }
  
      // Verificar si el usuario es manager principal o co-manager
      return (
        restaurant.managerPrincipal?.toString() === userId ||
        restaurant.coManagers.some((manager: ObjectId | string) => manager.toString() === userId)
      );
    } catch (error) {
      console.error('Error en el servicio checkUserRoleInRestaurant:', error);
      throw error;
    }
  };