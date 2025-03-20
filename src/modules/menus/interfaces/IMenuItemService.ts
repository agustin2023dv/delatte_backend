import { IMenu, IMenuItem } from "@delatte/shared/interfaces/Menu/IMenu";


export interface IMenuItemService {
    addMenuItem(menuId: string, itemData: IMenuItem): Promise<IMenu>;
    removeMenuItem(menuId: string, itemId: string): Promise<IMenu>;
    updateMenuItem(menuId: string, itemId: string, itemData:IMenuItem): Promise<IMenu>;
}