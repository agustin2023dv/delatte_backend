import Reservation from "../models/Reservation.model";

export class ReservationStatsRepository {
  //* 📊 Cantidad de reservas por día
  async getReservasDiarias() {
    return await Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }

  //* 📊 Cantidad de reservas por semana
  async getReservasSemanales() {
    return await Reservation.aggregate([
      {
        $group: {
          _id: { $isoWeek: "$fecha" },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }

  //* 📊 Cantidad de reservas por mes
  async getReservasMensuales() {
    return await Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$fecha" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
  }

  //* 📊 Cantidad de reservas por localidad
  async getReservasPorLocalidad() {
    return await Reservation.aggregate([
      {
        $lookup: {
          from: "restaurantes",
          localField: "restaurante",
          foreignField: "_id",
          as: "restauranteInfo"
        }
      },
      { $unwind: "$restauranteInfo" },
      {
        $group: {
          _id: "$restauranteInfo.localidad",
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } }
    ]);
  }

  //* 📊 Cantidad de reservas por restaurante
  async getReservasPorRestaurante() {
    return await Reservation.aggregate([
      {
        $group: {
          _id: "$restaurante",
          total: { $sum: 1 }
        }
      },
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
      {
        $group: {
          _id: "$horario",
          total: { $sum: 1 }
        }
      },
      { $sort: { total: -1 } },
      { $limit: 5 }
    ]);
  }

  //* 📊 Predicción de demanda basada en histórico
  async getPronosticoReservas() {
    const reservas = await Reservation.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$fecha" } },
          total: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    // Simulación de predicción basada en media de los últimos 7 días
    const totalReservas = reservas.map(r => r.total);
    const promedioUltimosDias = totalReservas.slice(-7).reduce((a, b) => a + b, 0) / 7;

    return {
      promedioUltimosDias,
      proyeccionSiguienteSemana: promedioUltimosDias * 7
    };
  }
}
