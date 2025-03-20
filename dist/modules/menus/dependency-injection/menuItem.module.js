"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menusItemModule = void 0;
const inversify_1 = require("inversify");
const menuItem_types_1 = require("../types/menuItem.types");
const menuItem_repository_1 = require("../repositories/menuItem.repository");
const menuItem_service_1 = require("../services/menuItem.service");
exports.menusItemModule = new inversify_1.ContainerModule((bind) => {
    bind(menuItem_types_1.MENUS_ITEM_TYPES.IMenuItemRepository).to(menuItem_repository_1.MenuItemRepository);
    bind(menuItem_types_1.MENUS_ITEM_TYPES.IMenuItemService).to(menuItem_service_1.MenuItemService);
});
