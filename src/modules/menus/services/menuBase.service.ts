import { injectable, inject } from "inversify";
import { MENUS_BASE_TYPES } from "../types/menuBase.types";
import {
  ICreateMenuDTO,
  IMenuResponseDTO,
  IUpdateMenuDTO,
} from "@delatte/shared/dtos";
import { IMenuBaseService } from "../interfaces/IMenuBaseService";
import { IMenuBaseRepository } from "../interfaces/IMenuBaseRepository";

@injectable()
export class MenuBaseService implements IMenuBaseService {
  constructor(
    @inject(MENUS_BASE_TYPES.IMenuBaseRepository)
    private menuBaseRepository: IMenuBaseRepository
  ) {}

  async getMenusByRestaurant(restaurantId: string): Promise<IMenuResponseDTO[]> {
    return await this.menuBaseRepository.getMenusByRestaurant(restaurantId);
  }

  async createMenu(menuData: ICreateMenuDTO): Promise<IMenuResponseDTO> {
    return await this.menuBaseRepository.createMenu(menuData);
  }

  async updateMenu(menuId: string, updatedData: IUpdateMenuDTO): Promise<IMenuResponseDTO> {
    return await this.menuBaseRepository.updateMenu(menuId, updatedData);
  }

  async deleteMenu(menuId: string): Promise<IMenuResponseDTO> {
    return await this.menuBaseRepository.deleteMenu(menuId);
  }
}
