"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewsBaseModule = void 0;
const inversify_1 = require("inversify");
const reviewBase_types_1 = require("../types/reviewBase.types");
const reviewBase_service_1 = require("../services/reviewBase.service");
const reviewBase_repository_1 = require("../repositories/reviewBase.repository");
exports.reviewsBaseModule = new inversify_1.ContainerModule((bind) => {
    bind(reviewBase_types_1.REVIEWS_BASE_TYPES.IReviewBaseRepository).to(reviewBase_repository_1.ReviewBaseRepository);
    bind(reviewBase_types_1.REVIEWS_BASE_TYPES.IReviewBaseService).to(reviewBase_service_1.ReviewBaseService);
});
