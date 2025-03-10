import { Request, Response } from "express";
import { ReservasAnaliticasService } from "../services/reservasAnaliticas.service";

// 📊 Obtener cantidad de reservas diarias
export const getReservasDiariasController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getReservasDiarias();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas diarias", error });
  }
};

// 📊 Obtener cantidad de reservas semanales
export const getReservasSemanalesController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getReservasSemanales();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas semanales", error });
  }
};

// 📊 Obtener cantidad de reservas mensuales
export const getReservasMensualesController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getReservasMensuales();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas mensuales", error });
  }
};

// 📊 Obtener reservas agrupadas por localidad
export const getReservasPorLocalidadController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getReservasPorLocalidad();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas por localidad", error });
  }
};

// 📊 Obtener cantidad de reservas por restaurante
export const getReservasPorRestauranteController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getReservasPorRestaurante();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas por restaurante", error });
  }
};

// 📊 Obtener listado de reservas canceladas con motivo
export const getReservasCanceladasController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getReservasCanceladas();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas canceladas", error });
  }
};

// 📊 Obtener los horarios con más reservas
export const getTopHorariosController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getTopHorarios();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los horarios con más reservas", error });
  }
};

// 📊 Obtener predicción de demanda de reservas basada en histórico
export const getPronosticoReservasController = async (req: Request, res: Response) => {
  try {
    const data = await ReservasAnaliticasService.getPronosticoReservas();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pronóstico de reservas", error });
  }
};
