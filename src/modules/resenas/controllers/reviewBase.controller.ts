import {
    controller,
    httpGet,
    httpPost,
    httpPut,
    httpDelete,
    BaseHttpController,
  } from "inversify-express-utils";
  import { Request, Response } from "express";
  import { inject } from "inversify";
  import { IReviewBaseService } from "../interfaces/IReviewBaseService";
  import { REVIEWS_BASE_TYPES } from "../types/reviewBase.types";
  import { authMiddleware } from "../../../middlewares/auth.middleware";
  import { roleMiddleware } from "../../../middlewares/role.middleware";
  import { AuthRequest } from "../../../../types";
  import {
    CreateReviewSchema,
    UpdateReviewSchema,
  } from "@delatte/shared/validators/reviews/review.schema"; 
  
  @controller("/api/v1/reviews")
  export class ReviewBaseController extends BaseHttpController {
    constructor(
      @inject(REVIEWS_BASE_TYPES.IReviewBaseService)
      private reviewService: IReviewBaseService
    ) {
      super();
    }
  
    @httpGet("/", authMiddleware, roleMiddleware(["superadmin"]))
    async getAllReviews(req: Request, res: Response): Promise<void> {
      try {
        const { page, limit } = req.query;
        const reviews = await this.reviewService.getAllReviews(Number(page) || 1, Number(limit) || 10);
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener todas las reseñas." });
      }
    }
  
    @httpGet("/restaurants/:id", authMiddleware)
    async getReviewsByRestaurant(req: Request, res: Response): Promise<void> {
      try {
        const reviews = await this.reviewService.getReviewsByRestaurant(req.params.id);
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener las reseñas del restaurante." });
      }
    }
  
    @httpGet("/users/:id", authMiddleware)
    async getReviewsByUser(req: Request, res: Response): Promise<void> {
      try {
        const reviews = await this.reviewService.getReviewsByUser(req.params.id);
        res.status(200).json(reviews);
      } catch (error) {
        res.status(500).json({ message: "Error al obtener las reseñas del usuario." });
      }
    }
  
    @httpPost("/", authMiddleware, roleMiddleware(["customer"]))
    async createReview(req: AuthRequest, res: Response) {
      try {
        if (!req.user) {
          res.status(401).json({ message: "Usuario no autenticado." });
          return;
        }
  
        const parsed = CreateReviewSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.flatten().fieldErrors });
        }
  
        const newReview = await this.reviewService.createReview(req.user._id, parsed.data);
        res.status(201).json({ message: "Reseña creada con éxito", review: newReview });
      } catch (error) {
        console.error("Error en createReview:", error);
        res.status(500).json({ message: error instanceof Error ? error.message : "Error interno del servidor" });
      }
    }
  
    @httpPut("/:id", authMiddleware, roleMiddleware(["customer"]))
    async updateReview(req: AuthRequest, res: Response){
      try {
        const parsed = UpdateReviewSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.flatten().fieldErrors });
        }
  
        const updatedReview = await this.reviewService.updateReview(req.params.id, parsed.data);
        if (!updatedReview) {
          res.status(404).json({ message: "Reseña no encontrada." });
          return;
        }
  
        res.status(200).json(updatedReview);
      } catch (error) {
        res.status(500).json({ message: "Error interno del servidor." });
      }
    }
  
    @httpDelete("/:id", authMiddleware, roleMiddleware(["customer", "superadmin"]))
    async deleteReview(req: AuthRequest, res: Response): Promise<void> {
      try {
        await this.reviewService.deleteReview(req.params.id);
        res.status(204).send();
      } catch (error) {
        res.status(500).json({ message: "Error al eliminar la reseña." });
      }
    }
  }
  