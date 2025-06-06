import { injectable } from "inversify";
import { IReviewBaseRepository } from "../interfaces/IReviewBaseRepository";
import { Review } from "../models/Review.model";
import { ICreateReviewDTO, IUpdateReviewDTO } from "@delatte/shared/dtos";
import { IReview, IReviewResponse } from "@delatte/shared/interfaces";

@injectable()
export class ReviewBaseRepository implements IReviewBaseRepository {

    async createReview(userId: string, reviewData: ICreateReviewDTO): Promise<IReview> {
        return await Review.create({ usuario: userId, restaurante: reviewData.restauranteId, ...reviewData });
      }
    
      async updateReview(reviewId: string, reviewData: IUpdateReviewDTO): Promise<IReview | null> {
        return await Review.findByIdAndUpdate(reviewId, reviewData, { new: true });
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

    async deleteReview(reviewId: string) {
        await Review.findByIdAndDelete(reviewId);
    }

async responderReview(
  reviewId: string,
  respuesta: { usuario: string; mensaje: string; fecha: Date }
): Promise<void> {
  await Review.findByIdAndUpdate(
    reviewId,
    { $push: { respuestas: respuesta } },
    { new: true }
  );
}


}
