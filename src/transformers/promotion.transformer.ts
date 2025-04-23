import { IPromotionResponseDTO } from '@delatte/shared/dtos';
import { Types } from 'mongoose';
import { IPromotion } from '@delatte/shared/interfaces';

type IPromotionWithRestaurant = IPromotion & {
  restaurante: {
    _id: string | Types.ObjectId;
    nombre: string;
    direccion: string;
  };
};

export class PromotionTransformer {
  static toResponseDTO(promotion: IPromotionWithRestaurant): IPromotionResponseDTO {
    return {
      _id: promotion._id.toString(),
      restaurante: {
        _id: promotion.restaurante._id.toString(),
        nombre: promotion.restaurante.nombre,
        direccion: promotion.restaurante.direccion,
      },
      titulo: promotion.titulo,
      descripcion: promotion.descripcion,
      fechaInicio: promotion.fechaInicio.toISOString(),
      fechaFin: promotion.fechaFin.toISOString(),
      descuento: promotion.descuento,
      estado: promotion.estado,
      fechaCreacion: promotion.fechaCreacion.toISOString(),
    };
  }
}
