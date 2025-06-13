import { injectable } from "inversify";
import MenuModel from "../models/Menu.model";
import {
  ICreateMenuDTO,
  IMenuResponseDTO,
  IUpdateMenuDTO,
} from "@delatte/shared/dtos";
import { IMenuBaseRepository } from "../interfaces/IMenuBaseRepository";
import { MenuTransformer } from "src/transformers/menu.transformer";

@injectable()
export class MenuBaseRepository implements IMenuBaseRepository {
  async getMenusByRestaurant(restaurantId: string): Promise<IMenuResponseDTO[]> {
    const menus = await MenuModel.find({ restaurante: restaurantId }).populate("restaurante", "nombre direccion");
    return menus.map(MenuTransformer.toMenuResponseDTO);
  }

  async createMenu(menuData: ICreateMenuDTO): Promise<IMenuResponseDTO> {
    const newMenu = await MenuModel.create({
      tipo: menuData.tipo,
      items: menuData.items,
      restaurante: menuData.restauranteId,
    });

    const populatedMenu = await newMenu.populate("restaurante", "nombre direccion");
    return MenuTransformer.toMenuResponseDTO(populatedMenu);
  }

  async updateMenu(menuId: string, updatedData: IUpdateMenuDTO): Promise<IMenuResponseDTO> {
    const updatedMenu = await MenuModel.findByIdAndUpdate(menuId, updatedData, {
      new: true,
    }).populate("restaurante", "nombre direccion");

    if (!updatedMenu) throw new Error("Menú no encontrado");
    return MenuTransformer.toMenuResponseDTO(updatedMenu);
  }

  async deleteMenu(menuId: string): Promise<IMenuResponseDTO> {
    const deletedMenu = await MenuModel.findByIdAndDelete(menuId).populate("restaurante", "nombre direccion");

    if (!deletedMenu) throw new Error("Menú no encontrado");
    return MenuTransformer.toMenuResponseDTO(deletedMenu);
  }

  async getMenuById(menuId: string): Promise<IMenuResponseDTO>{
        
    const menu = await MenuModel.findById(menuId);
        if (!menu) throw new Error("Menu no encontrado");
        return MenuTransformer.toMenuResponseDTO(menu);
  };
  
}