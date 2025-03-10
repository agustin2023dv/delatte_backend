import { ReservationStatsRepository } from "../repositories/reservationStats.repository";

export class ReservasAnaliticasService {
  private static reservationStatsRepo = new ReservationStatsRepository();

  //* 📊 Obtener reservas por día
  static async getReservasDiarias() {
    return await this.reservationStatsRepo.getReservasDiarias();
  }

  //* 📊 Obtener reservas por semana
  static async getReservasSemanales() {
    return await this.reservationStatsRepo.getReservasSemanales();
  }

  //* 📊 Obtener reservas por mes
  static async getReservasMensuales() {
    return await this.reservationStatsRepo.getReservasMensuales();
  }

  //* 📊 Obtener reservas por localidad
  static async getReservasPorLocalidad() {
    return await this.reservationStatsRepo.getReservasPorLocalidad();
  }

  //* 📊 Obtener reservas por restaurante
  static async getReservasPorRestaurante() {
    return await this.reservationStatsRepo.getReservasPorRestaurante();
  }

  //* 📊 Obtener reservas canceladas con motivo
  static async getReservasCanceladas() {
    return await this.reservationStatsRepo.getReservasCanceladas();
  }

  //* 📊 Obtener los horarios con más reservas
  static async getTopHorarios() {
    return await this.reservationStatsRepo.getTopHorarios();
  }

  //* 📊 Predecir la demanda de reservas
  static async getPronosticoReservas() {
    return await this.reservationStatsRepo.getPronosticoReservas();
  }
}
