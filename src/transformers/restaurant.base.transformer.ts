// src/transformers/restaurant.base.transformer.ts

import { IRestaurantRegistrationDTO } from "@delatte/shared/dtos";
import { Types } from "mongoose";

/**
 * Transforma un DTO de registro de restaurante en un objeto persistible por Mongoose.
 */
export class RestaurantBaseTransformer {
  static fromDTO(dto: IRestaurantRegistrationDTO) {
    return {
      identity: dto.identity,
      contact: dto.contact,
      location: {
        ...dto.location,
      },
      tradingHours: dto.tradingHours,
      capacity: dto.capacity,
      media: dto.media ?? { galeriaFotos: [] },
      status: {
        estaAbierto: false,
        estaTemporalmenteCerrado: false,
      },
      stats: {
        totalReservas: 0,
        calificacion: 0,
        totalReviews: 0,
      },
      management: {
        managerPrincipal: new Types.ObjectId(dto.management.managerPrincipal),
        coManagers: (dto.management.coManagers ?? []).map(id => new Types.ObjectId(id)),
      },
      tags: dto.tags ?? [],
      menus: [],
    };
  }
}
