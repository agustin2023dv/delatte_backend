import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
<<<<<<< Updated upstream
import {
  getReservasDiariasService,
  getReservasSemanalesService,
  getReservasMensualesService,
  getReservasPorLocalidadService,
  getReservasPorRestauranteService,
  getReservasCanceladasService,
  getTopHorariosService,
  getPronosticoReservasService
} from "../services/reservasAnaliticas.service";

// 📊 Obtener cantidad de reservas diarias
export const getReservasDiariasController = async (req: Request, res: Response) => {
  try {
    const data = await getReservasDiariasService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas diarias", error });
  }
};

// 📊 Obtener cantidad de reservas semanales
export const getReservasSemanalesController = async (req: Request, res: Response) => {
  try {
    const data = await getReservasSemanalesService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas semanales", error });
  }
};

// 📊 Obtener cantidad de reservas mensuales
export const getReservasMensualesController = async (req: Request, res: Response) => {
  try {
    const data = await getReservasMensualesService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas mensuales", error });
  }
};

// 📊 Obtener reservas agrupadas por localidad
export const getReservasPorLocalidadController = async (req: Request, res: Response) => {
  try {
    const data = await getReservasPorLocalidadService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas por localidad", error });
  }
};

// 📊 Obtener cantidad de reservas por restaurante
export const getReservasPorRestauranteController = async (req: Request, res: Response) => {
  try {
    const data = await getReservasPorRestauranteService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas por restaurante", error });
  }
};

// 📊 Obtener listado de reservas canceladas con motivo
export const getReservasCanceladasController = async (req: Request, res: Response) => {
  try {
    const data = await getReservasCanceladasService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener reservas canceladas", error });
  }
};

// 📊 Obtener los horarios con más reservas
export const getTopHorariosController = async (req: Request, res: Response) => {
  try {
    const data = await getTopHorariosService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los horarios con más reservas", error });
  }
};

// 📊 Obtener predicción de demanda de reservas basada en histórico
export const getPronosticoReservasController = async (req: Request, res: Response) => {
  try {
    const data = await getPronosticoReservasService();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el pronóstico de reservas", error });
  }
};
=======
import { inject } from "inversify";
import { IReservationAnalyticsService } from "../interfaces/IReservationAnalyticsService";
import { RESERVATIONS_ANAYLITICS_TYPES } from "../types/reservationAnalytics.types";

@controller("/api/v1/reservations/analytics")
export class ReservationAnalyticsController {
    constructor(
        @inject(RESERVATIONS_ANAYLITICS_TYPES.IReservationAnalyticsService)
        private reservationAnalyticsService: IReservationAnalyticsService
    ) {}

    @httpGet("/daily")
    async getReservasDiarias(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasDiarias();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas diarias", error });
        }
    }

    @httpGet("/weekly")
    async getReservasSemanales(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasSemanales();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas semanales", error });
        }
    }

    @httpGet("/monthly")
    async getReservasMensuales(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasMensuales();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas mensuales", error });
        }
    }

    @httpGet("/by-restaurant")
    async getReservasPorRestaurante(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasPorRestaurante();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas por restaurante", error });
        }
    }

    @httpGet("/canceled")
    async getReservasCanceladas(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getReservasCanceladas();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener reservas canceladas", error });
        }
    }

    @httpGet("/top-hours")
    async getTopHorarios(req: Request, res: Response) {
        try {
            const data = await this.reservationAnalyticsService.getTopHorarios();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener los horarios con más reservas", error });
        }
    }
}
>>>>>>> Stashed changes
