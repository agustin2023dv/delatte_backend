import { RestaurantSearchRepository } from "../repositories/restauranteBusqueda.repository";


export class RestaurantSearchService {
  //* 📌 Buscar restaurantes por nombre con límite de resultados
  static async searchByName(query: string, limit = 10) {
    return await RestaurantSearchRepository.searchByName(query, limit);
  }
}
