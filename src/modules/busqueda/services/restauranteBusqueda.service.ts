import Restaurant from "../../restaurantes/models/Restaurant.model";



// 📌 Servicio para buscar restaurantes por nombre (búsqueda parcial y ordenada)
export const searchRestaurantByNameService = async (query: string, limit: number) => {
  return Restaurant.find({ nombre: { $regex: `^${query}`, $options: "i" } }) // 🔥 Busca nombres que empiezan con la consulta
    .sort({ nombre: 1 }) // 🔥 Orden alfabético (A-Z)
    .limit(limit) // 🔥 Devuelve máximo 10 resultados
    .catch((error) => {
      console.error("Error en la búsqueda:", error);
      throw error;
    });
};