import { injectable } from "inversify";
import { IMenuItemRepository } from "../interfaces/IMenuItemRepository";
import { IMenu, IMenuItem } from "@delatte/shared/interfaces";
import MenuModel from "../models/Menu.model";

@injectable()
export class MenuItemRepository implements IMenuItemRepository {
    async addMenuItem(menuId: string, itemData: IMenuItem): Promise<IMenu> {
        const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, { $push: { items: itemData } }, { new: true });
        if (!updatedMenu) {
            throw new Error("Menú no encontrado");
        }
        return updatedMenu;
    }

    async removeMenuItem(menuId: string, itemId: string): Promise<IMenu> {
        const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, { $pull: { items: { _id: itemId } } }, { new: true });
        if (!updatedMenu) {
            throw new Error("Menú no encontrado");
        }
        return updatedMenu;
    }

    async updateMenuItem(menuId: string, itemId: string, itemData: IMenuItem): Promise<IMenu> {
        const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, { 
            $set: { "items.$[elem]": itemData }
        }, { 
            new: true, 
            arrayFilters: [{ "elem._id": itemId }] 
        });
        if (!updatedMenu) {
            throw new Error("Menú no encontrado");
        }
        return updatedMenu;
    }
}
