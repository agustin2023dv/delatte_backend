"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.promotionsBaseModule = void 0;
const inversify_1 = require("inversify");
const promotionBase_types_1 = require("../types/promotionBase.types");
const promotionBase_service_1 = require("../services/promotionBase.service");
const promotionBase_repository_1 = require("../repositories/promotionBase.repository");
exports.promotionsBaseModule = new inversify_1.ContainerModule((bind) => {
    bind(promotionBase_types_1.PROMOTIONS_BASE_TYPES.IPromotionBaseRepository).to(promotionBase_repository_1.PromotionBaseRepository);
    bind(promotionBase_types_1.PROMOTIONS_BASE_TYPES.IPromotionBaseService).to(promotionBase_service_1.PromotionBaseService);
    ;
});
