import { ContainerModule } from "inversify";
import { REVIEWS_BASE_TYPES } from "../types/reviewBase.types";
import { ReviewBaseService } from "../services/reviewBase.service";
import { ReviewBaseRepository } from "../repositories/reviewBase.repository";
import { IReviewBaseRepository } from "../interfaces/IReviewBaseRepository";
import { IReviewBaseService } from "../interfaces/IReviewBaseService";



export const reviewsBaseModule = new ContainerModule((bind) => {
bind<IReviewBaseRepository>(REVIEWS_BASE_TYPES.IReviewBaseRepository).to(ReviewBaseRepository);
bind<IReviewBaseService>(REVIEWS_BASE_TYPES.IReviewBaseService).to(ReviewBaseService);})