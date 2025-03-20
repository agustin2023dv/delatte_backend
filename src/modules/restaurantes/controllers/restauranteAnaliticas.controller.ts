import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
<<<<<<< Updated upstream
import {
  getTopRestaurantsService,
  getWorstPerformingRestaurantsService,
  getNewRestaurantsService,
  getSaturatedRestaurantsService,
} from "../services/restauranteAnaliticas.service";

// 📊 Restaurantes con más reservas y mejores calificaciones
export const getTopRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getTopRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los mejores restaurantes", error });
  }
};

// 📊 Restaurantes con menos reservas y peores calificaciones
export const getWorstPerformingRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getWorstPerformingRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los restaurantes con peor desempeño", error });
=======
import { inject } from "inversify";
import { IRestaurantStatsService } from "../interfaces/IRestaurantStatsService";
import { RESTAURANT_STATS_TYPES } from "../types/restaurantStats.types";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";

@controller("/api/v1/restaurants/analytics")
export class RestaurantAnalyticsController {
  constructor(
    @inject(RESTAURANT_STATS_TYPES.IRestaurantStatsService) 
    private restaurantStatsService: IRestaurantStatsService
  ) {}

  /**
   * @swagger
   * /api/v1/restaurants/analytics/top:
   *   get:
   *     summary: Obtener los restaurantes con más reservas y mejores calificaciones
   *     description: Devuelve una lista de los restaurantes mejor calificados y con más reservas en la plataforma.
   *     tags:
   *       - Restaurant Analytics
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de los mejores restaurantes obtenida correctamente.
   *       401:
   *         description: Usuario no autenticado.
   *       403:
   *         description: No autorizado para acceder a esta información.
   */
  @httpGet("/top", authMiddleware, roleMiddleware(["superadmin", "manager"]))
  async getTopRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.restaurantStatsService.getTopRestaurants();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los mejores restaurantes", error });
    }
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
// 📊 Restaurantes recién agregados
export const getNewRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getNewRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los restaurantes nuevos", error });
=======
  /**
   * @swagger
   * /api/v1/restaurants/analytics/worst-performing:
   *   get:
   *     summary: Obtener los restaurantes con menos reservas y peores calificaciones
   *     description: Devuelve una lista de los restaurantes con menor desempeño en términos de reservas y calificaciones.
   *     tags:
   *       - Restaurant Analytics
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de los restaurantes con menor desempeño obtenida correctamente.
   *       401:
   *         description: Usuario no autenticado.
   *       403:
   *         description: No autorizado para acceder a esta información.
   */
  @httpGet("/worst-performing", authMiddleware, roleMiddleware(["superadmin", "manager"]))
  async getWorstPerformingRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.restaurantStatsService.getWorstPerformingRestaurants();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los restaurantes con peor desempeño", error });
    }
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream
// 📊 Restaurantes con alta ocupación y baja disponibilidad
export const getSaturatedRestaurantsController = async (req: Request, res: Response) => {
  try {
    const data = await getSaturatedRestaurantsService();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener restaurantes saturados", error });
=======
  /**
   * @swagger
   * /api/v1/restaurants/analytics/new:
   *   get:
   *     summary: Obtener los restaurantes recién agregados
   *     description: Devuelve una lista de los restaurantes que se han registrado recientemente en la plataforma.
   *     tags:
   *       - Restaurant Analytics
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de los restaurantes nuevos obtenida correctamente.
   *       401:
   *         description: Usuario no autenticado.
   *       403:
   *         description: No autorizado para acceder a esta información.
   */
  @httpGet("/new", authMiddleware, roleMiddleware(["superadmin", "manager"]))
  async getNewRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.restaurantStatsService.getNewRestaurants();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los restaurantes nuevos", error });
    }
>>>>>>> Stashed changes
  }

  /**
   * @swagger
   * /api/v1/restaurants/analytics/saturation:
   *   get:
   *     summary: Obtener restaurantes con alta ocupación y baja disponibilidad
   *     description: Devuelve una lista de los restaurantes con alta demanda y disponibilidad limitada.
   *     tags:
   *       - Restaurant Analytics
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Lista de los restaurantes saturados obtenida correctamente.
   *       401:
   *         description: Usuario no autenticado.
   *       403:
   *         description: No autorizado para acceder a esta información.
   */
  @httpGet("/saturation", authMiddleware, roleMiddleware(["superadmin", "manager"]))
  async getSaturatedRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const data = await this.restaurantStatsService.getSaturatedRestaurants();
      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener restaurantes saturados", error });
    }
  }
}
