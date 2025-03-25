import { injectable, inject } from "inversify";
import {
  IAddMenuItemDTO,
  IRemoveMenuItemDTO,
  IUpdateMenuItemDTO,
  IMenuResponseDTO,
} from "@delatte/shared/dtos";
import { IMenuItemRepository } from "../interfaces/IMenuItemRepository";
import { MENUS_ITEM_TYPES } from "../types/menuItem.types";
import { IMenuItemService } from "../interfaces/IMenuItemService";

@injectable()
export class MenuItemService implements IMenuItemService {
  constructor(
    @inject(MENUS_ITEM_TYPES.IMenuItemRepository)
    private menuItemRepository: IMenuItemRepository
  ) {}

  async addMenuItem(data: IAddMenuItemDTO): Promise<IMenuResponseDTO> {
    return await this.menuItemRepository.addMenuItem(data);
  }

  async removeMenuItem(data: IRemoveMenuItemDTO): Promise<IMenuResponseDTO> {
    return await this.menuItemRepository.removeMenuItem(data);
  }

  async updateMenuItem(data: IUpdateMenuItemDTO): Promise<IMenuResponseDTO> {
    return await this.menuItemRepository.updateMenuItem(data);
  }
}
