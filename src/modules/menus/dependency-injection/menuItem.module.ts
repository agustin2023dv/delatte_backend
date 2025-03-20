import { ContainerModule } from "inversify";
import { MENUS_ITEM_TYPES } from "../types/menuItem.types";
import { IMenuItemService } from "../interfaces/IMenuItemService";
import { IMenuItemRepository } from "../interfaces/IMenuItemRepository";
import { MenuItemRepository } from "../repositories/menuItem.repository";
import { MenuItemService } from "../services/menuItem.service";



export const menusItemModule = new ContainerModule((bind) => {
bind<IMenuItemRepository>(MENUS_ITEM_TYPES.IMenuItemRepository).to(MenuItemRepository);
bind<IMenuItemService>(MENUS_ITEM_TYPES.IMenuItemService).to(MenuItemService);
})