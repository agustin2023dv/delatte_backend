import { Request, Response } from "express";
import { injectable, inject } from "inversify";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { PROMOTIONS_ANALYTICS_TYPES } from "../types/promotionAnalytics.types";
import { IPromotionAnalyticsService } from "../interfaces/IPromotionAnalyticsService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";

@controller("/api/v1/promotions/analytics")
export class PromotionAnalyticsController extends BaseHttpController{
    constructor(
        @inject(PROMOTIONS_ANALYTICS_TYPES.IPromotionAnalyticsService)
        private promotionAnalyticsService: IPromotionAnalyticsService
    ) {
        super();
    }

    @httpGet("/count", authMiddleware, roleMiddleware(["superadmin"]))
    async getPromotionCount(req: Request, res: Response) {
        try {
            const stats = await this.promotionAnalyticsService.getPromotionCount();
            if (!stats || stats.length === 0) {
                res.status(404).json({ message: "No se encontraron estadísticas de promociones" });
                return;
            }
            res.json(stats);
        } catch (error) {
            console.error("Error al obtener cantidad de promociones:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    @httpGet("/top-restaurants", authMiddleware, roleMiddleware(["superadmin"]))
    async getTopRestaurantsByPromotions(req: Request, res: Response) {
        try {
            const topRestaurants = await this.promotionAnalyticsService.getTopRestaurantsByPromotions();
            if (!topRestaurants || topRestaurants.length === 0) {
                res.status(404).json({ message: "No se encontraron restaurantes con promociones" });
                return;
            }
            res.json(topRestaurants);
        } catch (error) {
            console.error("Error al obtener restaurantes con más promociones:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    @httpGet("/impact", authMiddleware, roleMiddleware(["superadmin"]))
    async getPromotionImpact(req: Request, res: Response) {
        try {
            const impact = await this.promotionAnalyticsService.getPromotionImpact();
            if (!impact || impact.length === 0) {
                res.status(404).json({ message: "No se encontró impacto de promociones" });
                return;
            }
            res.json(impact);
        } catch (error) {
            console.error("Error al obtener impacto de promociones:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    @httpGet("/ineffective", authMiddleware, roleMiddleware(["superadmin"]))
    async getIneffectivePromotions(req: Request, res: Response) {
        try {
            const ineffectivePromos = await this.promotionAnalyticsService.getIneffectivePromotions();
            if (!ineffectivePromos || ineffectivePromos.length === 0) {
                res.status(404).json({ message: "No se encontraron promociones inefectivas" });
                return;
            }
            res.json(ineffectivePromos);
        } catch (error) {
            console.error("Error al obtener promociones inefectivas:", error);
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }
}
