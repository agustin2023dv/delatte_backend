"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userManagementModule = void 0;
const inversify_1 = require("inversify");
const userManagement_types_1 = require("../types/userManagement.types");
const userManagement_service_1 = require("../services/userManagement.service");
const userManagement_repository_1 = require("../repositories/userManagement.repository");
exports.userManagementModule = new inversify_1.ContainerModule((bind) => {
    bind(userManagement_types_1.USER_MANAGEMENT_TYPES.UserManagementRepository).to(userManagement_repository_1.UserManagementRepository);
    bind(userManagement_types_1.USER_MANAGEMENT_TYPES.UserManagementService).to(userManagement_service_1.UserManagementService);
});
