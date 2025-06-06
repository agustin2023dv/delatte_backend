import {
    ICreateReviewDTO,
    IUpdateReviewDTO,
    IReviewResponseDTO,
  } from "@delatte/shared/dtos";
  
  export interface IReviewBaseService {
    createReview(userId: string, reviewData: ICreateReviewDTO): Promise<IReviewResponseDTO>;
    updateReview(reviewId: string, reviewData: IUpdateReviewDTO): Promise<IReviewResponseDTO | null>;
    getAllReviews(page?: number, limit?: number): Promise<IReviewResponseDTO[]>;
    getReviewsByRestaurant(restaurantId: string): Promise<IReviewResponseDTO[]>;
    getReviewsByUser(userId: string): Promise<IReviewResponseDTO[]>;
    deleteReview(reviewId: string): Promise<void>;
    responderReview(reviewId: string, userId: string, mensaje: string): Promise<void>;

  }
  