import { injectable, inject } from "inversify";
import { IReviewBaseService } from "../interfaces/IReviewBaseService";
import { IReview } from "@delatte/shared/interfaces";
import { IReviewBaseRepository } from "../interfaces/IReviewBaseRepository";
import { REVIEWS_BASE_TYPES } from "../types/reviewBase.types";

@injectable()
export class ReviewBaseService implements IReviewBaseService {

    constructor(
        @inject(REVIEWS_BASE_TYPES.IReviewBaseRepository) private reviewRepo: IReviewBaseRepository
    ) {}

    async createReview(
        userId: string,
        reviewData: { restaurante: string; calificacion: number; comentario: string }
    ): Promise<IReview> {
        return await this.reviewRepo.createReview(userId, reviewData);
    }

    async getAllReviews(page = 1, limit = 10): Promise<IReview[]> {
        return await this.reviewRepo.getAllReviews(page, limit);
    }

    async getReviewsByRestaurant(restaurantId: string): Promise<IReview[]> {
        return await this.reviewRepo.getReviewsByRestaurant(restaurantId);
    }

    async getReviewsByUser(userId: string): Promise<IReview[]> {
        return await this.reviewRepo.getReviewsByUser(userId);
    }

    async updateReview(reviewId: string, reviewData: Partial<IReview>): Promise<IReview | null> {
        return await this.reviewRepo.updateReview(reviewId, reviewData);
    }

    async deleteReview(reviewId: string): Promise<void> {
        return await this.reviewRepo.deleteReview(reviewId);
    }
}
