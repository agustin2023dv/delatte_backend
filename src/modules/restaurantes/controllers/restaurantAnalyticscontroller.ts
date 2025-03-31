import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import { RESTAURANT_ANALYTICS_TYPES } from "../types/restaurantAnalytics.types";
import { IRestaurantAnalyticsService } from "../interfaces/IRestaurantAnalyticsService";

@controller("/api/v1/restaurants/analytics")
export class RestaurantAnalyticsController {
  constructor(
    @inject(RESTAURANT_ANALYTICS_TYPES.IRestaurantAnalyticsService) 
    private restaurantStatsService: IRestaurantAnalyticsService
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
  }

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
  }

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
