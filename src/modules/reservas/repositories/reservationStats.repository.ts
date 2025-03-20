import { injectable } from "inversify";
import Reservation from "../models/Reservation.model";
import { IReservationStatsRepository } from "../interfaces/IReservationStatsRepository";

@injectable()
export class ReservationStatsRepository implements IReservationStatsRepository {

  //* 📊 Cantidad de reservas por día
  async getReservasDiarias() {
    return await Reservation.aggregate([
      { $group: { _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } }, total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
  }

  //* 📊 Cantidad de reservas por semana
  async getReservasSemanales() {
    return await Reservation.aggregate([
      { $group: { _id: { $isoWeek: "$fecha" }, total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
  }

  //* 📊 Cantidad de reservas por mes
  async getReservasMensuales() {
    return await Reservation.aggregate([
      { $group: { _id: { $dateToString: { format: "%Y-%m", date: "$fecha" } }, total: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);
  }


  //* 📊 Cantidad de reservas por restaurante
  async getReservasPorRestaurante() {
    return await Reservation.aggregate([
      { $group: { _id: "$restaurante", total: { $sum: 1 } } },
      { $sort: { total: -1 } }
    ]);
  }

  //* 📊 Obtener listado de reservas canceladas con motivo
  async getReservasCanceladas() {
    return await Reservation.find({ estado: "Cancelada" }, { _id: 0, motivo: 1, fecha: 1 });
  }

  //* 📊 Obtener los horarios con más reservas
  async getTopHorarios() {
    return await Reservation.aggregate([
      { $group: { _id: "$horario", total: { $sum: 1 } } },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);
  }

  
}
