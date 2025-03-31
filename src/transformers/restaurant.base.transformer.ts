import { IRestaurantRegistrationDTO } from "@delatte/shared/dtos";

export class RestaurantBaseTransformer {
  static fromDTO(
    dto: IRestaurantRegistrationDTO,
    ubicacion: { type: "Point"; coordinates: [number, number] }
  ) {
    return {
      identity: {
        nombre: dto.nombre,
      },
      location: {
        direccion: dto.direccion,
        codigoPostal: dto.codigoPostal,
        pais: "Uruguay",       
        localidad: "Montevideo",
        ubicacion,
      },
      media: {
        galeriaFotos: [],
      },
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
        coManagers: [],
      },
      tags: [],
      menus: [],
    };
  }
}
