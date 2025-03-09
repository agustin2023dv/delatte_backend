import Restaurant from "../models/Restaurant.model";

export class RestaurantStatsRepository {
  //* 📊 Obtener los mejores restaurantes por reservas y calificación
  async getTopRestaurants() {
    return await Restaurant.find()
      .sort({ totalReservas: -1, calificacion: -1 })
      .limit(10);
  }

  //* 📊 Obtener los restaurantes con menor desempeño
  async getWorstPerformingRestaurants() {
    return await Restaurant.find()
      .sort({ totalReservas: 1, calificacion: 1 })
      .limit(10);
  }

  //* 📊 Obtener los restaurantes más nuevos
  async getNewRestaurants() {
    return await Restaurant.find()
      .sort({ _id: -1 }) 
      .limit(10);
  }

  //* 📊 Obtener restaurantes con alta ocupación y baja disponibilidad
  async getSaturatedRestaurants() {
    try {
      return await Restaurant.aggregate([
        {
          $project: {
            nombre: 1,
            direccion: 1,
            totalReservas: 1,
            capacidadMesas: 1,
            capacidadTotal: {
              $sum: {
                $map: {
                  input: "$capacidadMesas",
                  as: "mesa",
                  in: { $multiply: ["$$mesa.cantidad", "$$mesa.personasPorMesa"] },
                },
              },
            },
          },
        },
        {
          $addFields: {
            saturacion: {
              $cond: [
                { $gt: ["$capacidadTotal", 0] },
                { $divide: ["$totalReservas", "$capacidadTotal"] },
                0,
              ],
            },
          },
        },
        {
          $sort: { saturacion: -1 },
        },
        {
          $limit: 10,
        },
      ]);
    } catch (error) {
      console.error("Error al calcular restaurantes saturados:", error);
      throw error;
    }
  }
}
