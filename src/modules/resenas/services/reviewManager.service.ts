// reviewManager.service.ts

import { inject, injectable } from "inversify";
import { IReviewManagerService } from "../interfaces/IReviewManagerService";
import { REVIEWS_MANAGER_TYPES } from "../types/reviewManager.types";
import { IReviewManagerRepository } from "../interfaces/IReviewManagerRepository";

@injectable()
export class ReviewManagerService implements IReviewManagerService {
  constructor(
    @inject(REVIEWS_MANAGER_TYPES.IReviewManagerRepository)
    private reviewManagerRepository: IReviewManagerRepository
  ) {}

  async getReviewsByManager(managerId: string) {
    return this.reviewManagerRepository.findReviewsByManagerRestaurants(managerId);
  }
}

