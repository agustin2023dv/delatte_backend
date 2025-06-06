import { IReview } from "@delatte/shared/interfaces";

export interface IReviewManagerRepository {
  findReviewsByManagerRestaurants(managerId: string): Promise<IReview[]>;
}