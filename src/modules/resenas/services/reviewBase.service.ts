import { injectable, inject } from "inversify";
import { IReviewBaseService } from "../interfaces/IReviewBaseService";
import { IReviewBaseRepository } from "../interfaces/IReviewBaseRepository";
import { REVIEWS_BASE_TYPES } from "../types/reviewBase.types";
import {
  ICreateReviewDTO,
  IUpdateReviewDTO,
  IReviewResponseDTO,
} from "@delatte/shared/dtos";
import { ReviewTransformer } from "@/transformers/review.transformer";
import { IReview } from "@delatte/shared/interfaces";

@injectable()
export class ReviewBaseService implements IReviewBaseService {
  constructor(
    @inject(REVIEWS_BASE_TYPES.IReviewBaseRepository)
    private reviewRepo: IReviewBaseRepository
  ) {}

  async createReview(userId: string, reviewData: ICreateReviewDTO): Promise<IReviewResponseDTO> {
    const review = await this.reviewRepo.createReview(userId, reviewData);
    return ReviewTransformer.toReviewResponseDTO(review);
  }

  async updateReview(reviewId: string, reviewData: IUpdateReviewDTO): Promise<IReviewResponseDTO | null> {
    const updated = await this.reviewRepo.updateReview(reviewId, reviewData);
    return updated ? ReviewTransformer.toReviewResponseDTO(updated) : null;
  }

  async getAllReviews(page = 1, limit = 10): Promise<IReviewResponseDTO[]> {
    const reviews = await this.reviewRepo.getAllReviews(page, limit);
    return ReviewTransformer.toManyReviewResponseDTOs(reviews);
  }

  async getReviewsByRestaurant(restaurantId: string): Promise<IReviewResponseDTO[]> {
    const reviews = await this.reviewRepo.getReviewsByRestaurant(restaurantId);
    return ReviewTransformer.toManyReviewResponseDTOs(reviews);
  }

  async getReviewsByUser(userId: string): Promise<IReviewResponseDTO[]> {
    const reviews = await this.reviewRepo.getReviewsByUser(userId);
    return ReviewTransformer.toManyReviewResponseDTOs(reviews);
  }

  async deleteReview(reviewId: string): Promise<void> {
    await this.reviewRepo.deleteReview(reviewId);
  }
}
