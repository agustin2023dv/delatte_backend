"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuBaseModule = void 0;
const inversify_1 = require("inversify");
const menuBase_types_1 = require("../types/menuBase.types");
const menuBase_repository_1 = require("../repositories/menuBase.repository");
const menuBase_service_1 = require("../services/menuBase.service");
exports.menuBaseModule = new inversify_1.ContainerModule((bind) => {
    bind(menuBase_types_1.MENUS_BASE_TYPES.IMenuBaseRepository).to(menuBase_repository_1.MenuBaseRepository);
    bind(menuBase_types_1.MENUS_BASE_TYPES.IMenuBaseService).to(menuBase_service_1.MenuBaseService);
});
