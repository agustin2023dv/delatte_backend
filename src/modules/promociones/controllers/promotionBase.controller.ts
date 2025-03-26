import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpGet,
  httpPut,
  httpDelete,
  BaseHttpController,
} from "inversify-express-utils";
import { PROMOTIONS_BASE_TYPES } from "../types/promotionBase.types";
import { IPromotionBaseService } from "../interfaces/IPromotionBaseService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";
import { ICreatePromotionDTO, IUpdatePromotionDTO } from "@delatte/shared/dtos";
import { CreatePromotionSchema, UpdatePromotionSchema } from "@delatte/shared/validators";


@controller("/api/v1/promotions")
export class PromotionBaseController extends BaseHttpController {
  constructor(
    @inject(PROMOTIONS_BASE_TYPES.IPromotionBaseService)
    private promotionService: IPromotionBaseService
  ) {
    super();
  }

  @httpPost("/:id", authMiddleware, managerOfRestaurantMiddleware)
  async createPromotion(req: Request, res: Response) {
    try {
      const parsed = CreatePromotionSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const newPromotion = await this.promotionService.createPromotion(parsed.data);
      res.status(201).json(newPromotion);
    } catch (error) {
      res.status(500).json({ message: "Error al crear la promoción", error });
    }
  }

  @httpGet("/:id")
  async getPromotions(req: Request, res: Response) {
    try {
      const promotions = await this.promotionService.getPromotionsByRestaurant(req.params.id);
      res.status(200).json(promotions);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener promociones", error });
    }
  }

  @httpPut("/:id/promotions/:promoId", authMiddleware, managerOfRestaurantMiddleware)
  async updatePromotion(req: Request, res: Response) {
    try {
      const parsed = UpdatePromotionSchema.safeParse(req.body);

      if (!parsed.success) {
        return res.status(400).json({
          message: "Datos inválidos",
          errors: parsed.error.flatten().fieldErrors,
        });
      }

      const updatedPromotion = await this.promotionService.updatePromotion(
        req.params.promoId,
        parsed.data
      );

      res.status(200).json(updatedPromotion);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar la promoción", error });
    }
  }

  @httpDelete("/:id/promotions/:promoId", authMiddleware, managerOfRestaurantMiddleware)
  async deletePromotion(req: Request, res: Response) {
    try {
      await this.promotionService.deletePromotion(req.params.promoId);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar la promoción", error });
    }
  }
}
