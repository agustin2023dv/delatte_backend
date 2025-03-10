import Restaurant from "../../restaurantes/models/Restaurant.model";

export class RestaurantSearchRepository {
  //* 📌 Buscar restaurantes por nombre (búsqueda parcial y ordenada)
  static async searchByName(query: string, limit: number) {
    try {
      return await Restaurant.find({ nombre: { $regex: `^${query}`, $options: "i" } })
        .sort({ nombre: 1 })
        .limit(limit);
    } catch (error) {
      console.error("Error en la búsqueda de restaurantes:", error);
      throw error;
    }
  }
}
