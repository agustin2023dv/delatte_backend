import { ContainerModule } from "inversify";
import { PROMOTIONS_BASE_TYPES } from "../types/promotionBase.types";
import { IPromotionBaseRepository } from "../interfaces/IPromotionBaseRepository";
import { IPromotionBaseService } from "../interfaces/IPromotionBaseService";
import { PromotionBaseController } from "../controllers/promotionBase.controller";
import { PromotionBaseService } from "../services/promotionBase.service";
import { PromotionBaseRepository } from "../repositories/promotionBase.repository";
import { Controller, TYPE } from "inversify-express-utils";

export const promotionsBaseModule = new ContainerModule((bind) => {
bind<IPromotionBaseRepository>(PROMOTIONS_BASE_TYPES.IPromotionBaseRepository).to(PromotionBaseRepository);
bind<IPromotionBaseService>(PROMOTIONS_BASE_TYPES.IPromotionBaseService).to(PromotionBaseService);
;})