import { injectable } from "inversify";
import { IMenu } from "@delatte/shared/interfaces";
import MenuModel from "../models/Menu.model";
import { IMenuBaseRepository } from "../interfaces/IMenuBaseRepository";

@injectable()
export class MenuBaseRepository implements IMenuBaseRepository {
    async getMenusByRestaurant(restaurantId: string): Promise<IMenu[]> {
        return await MenuModel.find({ restaurant: restaurantId });
    }

    async createMenu(menuData: Partial<IMenu>): Promise<IMenu> {
        return await MenuModel.create(menuData);
    }

    async updateMenu(menuId: string, updatedData: Partial<IMenu>): Promise<IMenu> {
        const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, updatedData, { new: true });
        if (!updatedMenu) {
            throw new Error("Menú no encontrado");
        }
        return updatedMenu;
    }

    async deleteMenu(menuId: string): Promise<IMenu> {
        const deletedMenu = await MenuModel.findByIdAndDelete(menuId);
        if (!deletedMenu) {
            throw new Error("Menú no encontrado");
        }
        return deletedMenu;
    }
}
