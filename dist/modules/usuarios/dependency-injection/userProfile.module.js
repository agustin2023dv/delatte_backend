"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userProfileModule = void 0;
const inversify_1 = require("inversify");
const userProfile_types_1 = require("../types/userProfile.types");
const userProfile_repository_1 = require("../repositories/userProfile.repository");
const userProfile_service_1 = require("../services/userProfile.service");
exports.userProfileModule = new inversify_1.ContainerModule((bind) => {
    bind(userProfile_types_1.USER_PROFILE_TYPES.UserProfileRepository).to(userProfile_repository_1.UserProfileRepository);
    bind(userProfile_types_1.USER_PROFILE_TYPES.UserProfileService).to(userProfile_service_1.UserProfileService);
});
