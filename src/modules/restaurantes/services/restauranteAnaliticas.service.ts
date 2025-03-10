import { RestaurantStatsRepository } from "../repositories/restaurantStats.repository";

export class RestaurantAnalyticsService {
  private static restaurantStatsRepo = new RestaurantStatsRepository();

  //* 📊 Obtener los mejores restaurantes
  static async getTopRestaurants() {
    return await this.restaurantStatsRepo.getTopRestaurants();
  }

  //* 📊 Obtener los peores restaurantes
  static async getWorstPerformingRestaurants() {
    return await this.restaurantStatsRepo.getWorstPerformingRestaurants();
  }

  //* 📊 Obtener los restaurantes más nuevos
  static async getNewRestaurants() {
    return await this.restaurantStatsRepo.getNewRestaurants();
  }

  //* 📊 Obtener los restaurantes más saturados
  static async getSaturatedRestaurants() {
    return await this.restaurantStatsRepo.getSaturatedRestaurants();
  }
}
