import Restaurant from "../models/Restaurant.model";

// 📊 Obtener los mejores restaurantes por reservas y calificación
export const getTopRestaurantsService = async () => {
  return await Restaurant.find()
    .sort({ totalReservas: -1, calificacion: -1 }) // Más reservas y mejor calificación primero
    .limit(10);
};

// 📊 Obtener los restaurantes con menor desempeño
export const getWorstPerformingRestaurantsService = async () => {
  return await Restaurant.find()
    .sort({ totalReservas: 1, calificacion: 1 }) // Menos reservas y peor calificación primero
    .limit(10);
};

// 📊 Obtener los restaurantes más nuevos
export const getNewRestaurantsService = async () => {
  return await Restaurant.find()
    .sort({ _id: -1 }) 
    .limit(10);
};

// 📊 Obtener restaurantes con alta ocupación y baja disponibilidad
export const getSaturatedRestaurantsService = async () => {
    try {
      // Agregar un campo virtual para calcular la saturación
      const restaurants = await Restaurant.aggregate([
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
                { $gt: ["$capacidadTotal", 0] }, // Evitar división por cero
                { $divide: ["$totalReservas", "$capacidadTotal"] },
                0, // Si la capacidad total es 0, la saturación es 0
              ],
            },
          },
        },
        {
          $sort: { saturacion: -1 }, // Ordenar por saturación descendente
        },
        {
          $limit: 10, // Limitar a los 10 restaurantes más saturados
        },
      ]);
  
      return restaurants;
    } catch (error) {
      console.error("Error al calcular restaurantes saturados:", error);
      throw error;
    }
  };