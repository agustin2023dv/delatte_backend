import { RestaurantStatsRepository } from "../repositories/restaurantStats.repository";

const restaurantStatsRepo = new RestaurantStatsRepository();

//* 📊 Servicio para obtener los mejores restaurantes
export const getTopRestaurantsService = async () => {
  return await restaurantStatsRepo.getTopRestaurants();
};

//* 📊 Servicio para obtener los peores restaurantes
export const getWorstPerformingRestaurantsService = async () => {
  return await restaurantStatsRepo.getWorstPerformingRestaurants();
};

//* 📊 Servicio para obtener los restaurantes más nuevos
export const getNewRestaurantsService = async () => {
  return await restaurantStatsRepo.getNewRestaurants();
};

//* 📊 Servicio para obtener los restaurantes más saturados
export const getSaturatedRestaurantsService = async () => {
  return await restaurantStatsRepo.getSaturatedRestaurants();
};
