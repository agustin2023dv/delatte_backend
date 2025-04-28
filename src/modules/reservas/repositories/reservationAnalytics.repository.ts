import { injectable } from "inversify";
import Reservation from "../models/Reservation.model";
import { IReservationAnalyticsRepository } from "../interfaces/IReservationAnalyticsRepository";
import {
  IDailyReservationsDTO,
  IWeeklyReservationsDTO,
  IMonthlyReservationsDTO,
  IReservationsByRestaurantDTO,
  ICancelledReservationDTO,
  ITopReservationHoursDTO
} from "@delatte/shared/dtos";

@injectable()
export class ReservationAnalyticsRepository implements IReservationAnalyticsRepository {
  
  async getReservasDiarias(): Promise<IDailyReservationsDTO[]> {
    return await Reservation.aggregate([
      { 
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$reservationData.fecha" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }

  async getReservasSemanales(): Promise<IWeeklyReservationsDTO[]> {
    return await Reservation.aggregate([
      {
        $group: {
          _id: { $isoWeek: "$reservationData.fecha" },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }

  async getReservasMensuales(): Promise<IMonthlyReservationsDTO[]> {
    return await Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$reservationData.fecha" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }

  async getReservasPorRestaurante(): Promise<IReservationsByRestaurantDTO[]> {
    return await Reservation.aggregate([
      {
        $group: {
          _id: "$restaurantInfo.restaurante",
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);
  }

  async getReservasCanceladas(): Promise<ICancelledReservationDTO[]> {
    const results = await Reservation.find(
      { "reservationStatus.estado": "Cancelada" },
      { "reservationData.fecha": 1, _id: 0 }
    ).lean();

    return (results as any[]).map((res) => ({
      motivo: res.motivo || "Sin motivo", 
      fecha: res.reservationData?.fecha
        ? new Date(res.reservationData.fecha).toISOString().split("T")[0]
        : "Fecha desconocida",
    }));
  }

  async getTopHorarios(): Promise<ITopReservationHoursDTO[]> {
    return await Reservation.aggregate([
      {
        $group: {
          _id: "$reservationData.horario",
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);
  }
}
