import { ContainerModule } from "inversify";
import { PROMOTIONS_BASE_TYPES } from "../types/promotionBase.types";
import { IPromotionBaseRepository } from "../interfaces/IPromotionBaseRepository";
import { IPromotionBaseService } from "../interfaces/IPromotionBaseService";
import { PromotionBaseService } from "../services/promotionBase.service";
import { PromotionBaseRepository } from "../repositories/promotionBase.repository";

export const promotionsBaseModule = new ContainerModule((bind) => {
bind<IPromotionBaseRepository>(PROMOTIONS_BASE_TYPES.IPromotionBaseRepository).to(PromotionBaseRepository);
bind<IPromotionBaseService>(PROMOTIONS_BASE_TYPES.IPromotionBaseService).to(PromotionBaseService);
;})