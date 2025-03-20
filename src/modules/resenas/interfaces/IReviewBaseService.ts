import { IReview } from "@delatte/shared/interfaces";

export interface IReviewBaseService {
    createReview(userId: string, reviewData: { restaurante: string; calificacion: number; comentario: string }): 
    Promise<IReview>;
    getAllReviews(page?: number, limit?: number): Promise<IReview[]>;
    getReviewsByRestaurant(restaurantId: string): Promise<IReview[]>;
    getReviewsByUser(userId: string): Promise<IReview[]>;
    updateReview(reviewId: string, reviewData: Partial<IReview>): Promise<IReview | null>;
    deleteReview(reviewId: string): Promise<void>;
}
