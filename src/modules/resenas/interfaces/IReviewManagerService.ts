import { IReview } from "@delatte/shared/interfaces";

export interface IReviewManagerService {
  getReviewsByManager(managerId: string): Promise<IReview[]>;
}