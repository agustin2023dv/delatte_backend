import { ICreateReviewDTO, IUpdateReviewDTO } from "@delatte/shared/dtos";
import { IReviewResponse } from "@delatte/shared/interfaces";
import { IReview } from "@delatte/shared/interfaces/Review/IReview";

export interface IReviewBaseRepository {
    createReview(userId: string, reviewData: ICreateReviewDTO): Promise<IReview>;
    updateReview(reviewId: string, reviewData: IUpdateReviewDTO): Promise<IReview | null>;
    getAllReviews(page?: number, limit?: number): Promise<IReview[]>;
    getReviewsByRestaurant(restaurantId: string): Promise<IReview[]>;
    getReviewsByUser(userId: string): Promise<IReview[]>;
    deleteReview(reviewId: string): Promise<void>;
responderReview(
  reviewId: string,
  respuesta: { usuario: string; mensaje: string; fecha: Date }
): Promise<void>;


}