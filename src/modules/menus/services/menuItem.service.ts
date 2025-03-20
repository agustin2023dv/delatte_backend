import { injectable, inject } from "inversify";

import { IMenu, IMenuItem } from "@delatte/shared/interfaces";
import { IMenuItemService } from "../interfaces/IMenuItemService";
import { IMenuItemRepository } from "../interfaces/IMenuItemRepository";
import { MENUS_ITEM_TYPES } from "../types/menuItem.types";

@injectable()
export class MenuItemService implements IMenuItemService {
    constructor(
        @inject(MENUS_ITEM_TYPES.IMenuItemRepository)
        private menuItemRepository: IMenuItemRepository
    ) {}

    async updateMenuItem(menuId: string, itemId: string,itemData: IMenuItem): Promise<IMenu> {
        return await this.menuItemRepository.updateMenuItem(menuId, itemId, itemData);
    }

    async addMenuItem(menuId: string, itemData: IMenuItem): Promise<IMenu> {
        return await this.menuItemRepository.addMenuItem(menuId, itemData);
    }

    async removeMenuItem(menuId: string, itemId: string): Promise<IMenu> {
        return await this.menuItemRepository.removeMenuItem(menuId, itemId);
    }
}
