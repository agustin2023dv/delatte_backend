import { injectable, inject } from "inversify";
import { IMenuBaseService } from "../interfaces/IMenuBaseService";
import { IMenu } from "@delatte/shared/interfaces";
import { MENUS_BASE_TYPES } from "../types/menuBase.types";
import { IMenuBaseRepository } from "../interfaces/IMenuBaseRepository";

@injectable()
export class MenuBaseService implements IMenuBaseService {
    constructor(
        @inject(MENUS_BASE_TYPES.IMenuBaseRepository)
        private menuBaseRepository: IMenuBaseRepository
    ) {}

    async getMenusByRestaurant(restaurantId: string): Promise<IMenu[]> {
        return await this.menuBaseRepository.getMenusByRestaurant(restaurantId);
    }

    async createMenu(menuData: Partial<IMenu>): Promise<IMenu> {
        return await this.menuBaseRepository.createMenu(menuData);
    }

    async updateMenu(menuId: string, updatedData: Partial<IMenu>): Promise<IMenu> {
        return await this.menuBaseRepository.updateMenu(menuId, updatedData);
    }

    async deleteMenu(menuId: string): Promise<IMenu> {
        return await this.menuBaseRepository.deleteMenu(menuId);
    }


}
