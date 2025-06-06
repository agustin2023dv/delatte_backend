import { ContainerModule } from "inversify";
import { REVIEWS_MANAGER_TYPES } from "../types/reviewManager.types";
import { IReviewManagerService } from "../interfaces/IReviewManagerService";
import { ReviewManagerService } from "../services/reviewManager.service";
import { IReviewManagerRepository } from "../interfaces/IReviewManagerRepository";
import { ReviewManagerRepository } from "../repositories/reviewManager.repository";


export const reviewsManagerModule = new ContainerModule((bind) => {
    bind<IReviewManagerRepository>(REVIEWS_MANAGER_TYPES.IReviewManagerRepository)
  .to(ReviewManagerRepository);
bind<IReviewManagerService>(REVIEWS_MANAGER_TYPES.IReviewManagerService).to(ReviewManagerService);
