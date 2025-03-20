import { injectable } from "inversify";
import { IReviewBaseRepository } from "../interfaces/IReviewBaseRepository";
import { Review } from "../models/Review.model";

@injectable()
export class ReviewBaseRepository implements IReviewBaseRepository {

    async createReview(userId: string, reviewData: { restaurante: string; calificacion: number; comentario: string }) {
        return await Review.create({ usuario: userId, ...reviewData });
    }

    async getAllReviews(page = 1, limit = 10) {
        return await Review.find().skip((page - 1) * limit).limit(limit);
    }

    async getReviewsByRestaurant(restaurantId: string) {
        return await Review.find({ restaurante: restaurantId });
    }

    async getReviewsByUser(userId: string) {
        return await Review.find({ usuario: userId });
    }

    async updateReview(reviewId: string, reviewData: any) {
        return await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
    }

    async deleteReview(reviewId: string) {
        await Review.findByIdAndDelete(reviewId);
    }
}
