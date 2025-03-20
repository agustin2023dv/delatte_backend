import { IMenu, IMenuItem } from "@delatte/shared/interfaces";

export interface IMenuItemRepository {
    addMenuItem(menuId: string, itemData: IMenuItem): Promise<IMenu>;
    removeMenuItem(menuId: string, itemId: string): Promise<IMenu>;
    updateMenuItem(menuId: string, itemId: string, itemData: IMenuItem): Promise<IMenu>;
}
