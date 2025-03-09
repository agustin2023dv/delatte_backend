import { ReservationStatsRepository } from "../repositories/reservationStats.repository";

const reservationStatsRepo = new ReservationStatsRepository();

//* 📊 Servicio para obtener reservas por día
export const getReservasDiariasService = async () => {
  return await reservationStatsRepo.getReservasDiarias();
};

//* 📊 Servicio para obtener reservas por semana
export const getReservasSemanalesService = async () => {
  return await reservationStatsRepo.getReservasSemanales();
};

//* 📊 Servicio para obtener reservas por mes
export const getReservasMensualesService = async () => {
  return await reservationStatsRepo.getReservasMensuales();
};

//* 📊 Servicio para obtener reservas por localidad
export const getReservasPorLocalidadService = async () => {
  return await reservationStatsRepo.getReservasPorLocalidad();
};

//* 📊 Servicio para obtener reservas por restaurante
export const getReservasPorRestauranteService = async () => {
  return await reservationStatsRepo.getReservasPorRestaurante();
};

//* 📊 Servicio para obtener reservas canceladas con motivo
export const getReservasCanceladasService = async () => {
  return await reservationStatsRepo.getReservasCanceladas();
};

//* 📊 Servicio para obtener los horarios con más reservas
export const getTopHorariosService = async () => {
  return await reservationStatsRepo.getTopHorarios();
};

//* 📊 Servicio para predecir la demanda de reservas
export const getPronosticoReservasService = async () => {
  return await reservationStatsRepo.getPronosticoReservas();
};
