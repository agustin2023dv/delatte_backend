import { ICreateReservationDTO } from "@delatte/shared/dtos";
import { ReservationMongoInput } from "@modules/reservas/types/reservation.types";
import { Types } from "mongoose";

export class ReservationTransformer {
  static fromDTO(dto: ICreateReservationDTO): ReservationMongoInput {
    if (!dto.usuarioId || !dto.restauranteId) {
      throw new Error("usuarioId y restauranteId son requeridos para transformar el DTO");
    }

    return {
      usuario: new Types.ObjectId(dto.usuarioId),
      restaurante: new Types.ObjectId(dto.restauranteId),
      fecha: new Date(dto.fecha),
      horario: dto.horario,
      cantidadAdultos: dto.cantidadAdultos,
      cantidadNinios: dto.cantidadNinios,
      notas: dto.notas,
      estado: "Confirmada",
    };
  }
}
