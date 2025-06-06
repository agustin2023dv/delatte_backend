import { inject } from "inversify";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { REVIEWS_MANAGER_TYPES } from "../types/reviewManager.types";
import { IReviewManagerService } from "../interfaces/IReviewManagerService";
import { Request, Response } from 'express';


@controller('/api/v1/reviews/managers')
export class ReviewManagerController extends BaseHttpController {
  constructor(
    @inject(REVIEWS_MANAGER_TYPES.IReviewManagerService)
    private reviewManagerService: IReviewManagerService
  ) {
    super();
  }

  @httpGet('/:managerId')
  async getReviewsByManager(req: Request, res: Response) {
    try {
      const { managerId } = req.params;
      const reviews = await this.reviewManagerService.getReviewsByManager(managerId);
      res.status(200).json(reviews);
    } catch (error) {
      console.error('Error al obtener reviews del manager:', error);
      res.status(500).json({ message: 'Error interno del servidor.' });
    }
  }
}