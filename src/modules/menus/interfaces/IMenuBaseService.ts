import { IMenu } from "@delatte/shared/interfaces/Menu/IMenu";


export interface IMenuBaseService {
    getMenusByRestaurant(restaurantId: string): Promise<IMenu[]>;
    createMenu(menuData: Partial<IMenu>): Promise<IMenu>;
    updateMenu(menuId: string, updatedData: Partial<IMenu>): Promise<IMenu>;
    deleteMenu(menuId: string): Promise<IMenu>;
}
