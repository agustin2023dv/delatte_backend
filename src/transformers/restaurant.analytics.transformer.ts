import {
    INewRestaurantStatsDTO,
    ISaturatedRestaurantStatsDTO,
    ITopRestaurantStatsDTO,
    IWorstRestaurantStatsDTO,
  } from "@delatte/shared/dtos";
  
  export class RestaurantAnalyticsTransformer {
    static toTopDTO(restaurant: any): ITopRestaurantStatsDTO {
      return {
        _id: restaurant._id.toString(),
        nombre: restaurant.identity.nombre,
        totalReservas: restaurant.stats.totalReservas,
        calificacion: restaurant.stats.calificacion,
      };
    }
  
    static toWorstDTO(restaurant: any): IWorstRestaurantStatsDTO {
      return {
        _id: restaurant._id.toString(),
        nombre: restaurant.identity.nombre,
        totalReservas: restaurant.stats.totalReservas,
        calificacion: restaurant.stats.calificacion,
      };
    }
  
    static toNewDTO(restaurant: any): INewRestaurantStatsDTO {
      return {
        _id: restaurant._id.toString(),
        nombre: restaurant.identity.nombre,
        createdAt: restaurant.createdAt.toISOString(),
      };
    }
  
    static toSaturatedDTO(aggResult: any): ISaturatedRestaurantStatsDTO {
      return {
        _id: aggResult._id.toString(),
        nombre: aggResult.nombre,
        direccion: aggResult.direccion,
        totalReservas: aggResult.totalReservas,
        capacidadTotal: aggResult.capacidadTotal,
        saturacion: aggResult.saturacion,
      };
    }
  }
  