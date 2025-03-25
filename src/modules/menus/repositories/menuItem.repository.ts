import { injectable } from "inversify";
import {
  IAddMenuItemDTO,
  IRemoveMenuItemDTO,
  IUpdateMenuItemDTO,
  IMenuResponseDTO,
} from "@delatte/shared/dtos";
import { IMenuItemRepository } from "../interfaces/IMenuItemRepository";
import MenuModel from "../models/Menu.model";
import { MenuTransformer } from "src/transformers/menu.transformer";

@injectable()
export class MenuItemRepository implements IMenuItemRepository {
  async addMenuItem(data: IAddMenuItemDTO): Promise<IMenuResponseDTO> {
    const updatedMenu = await MenuModel.findByIdAndUpdate(
      data.menuId,
      { $push: { items: data.item } },
      { new: true }
    ).populate("restaurante", "nombre direccion");

    if (!updatedMenu) throw new Error("Menú no encontrado");
    return MenuTransformer.toMenuResponseDTO(updatedMenu);
  }

  async removeMenuItem(data: IRemoveMenuItemDTO): Promise<IMenuResponseDTO> {
    const updatedMenu = await MenuModel.findByIdAndUpdate(
      data.menuId,
      { $pull: { items: { _id: data.itemId } } },
      { new: true }
    ).populate("restaurante", "nombre direccion");

    if (!updatedMenu) throw new Error("Menú no encontrado");
    return MenuTransformer.toMenuResponseDTO(updatedMenu);
  }

  async updateMenuItem(data: IUpdateMenuItemDTO): Promise<IMenuResponseDTO> {
    const updatedMenu = await MenuModel.findByIdAndUpdate(
      data.menuId,
      { $set: { "items.$[elem]": data.item } },
      {
        new: true,
        arrayFilters: [{ "elem._id": data.itemId }],
      }
    ).populate("restaurante", "nombre direccion");

    if (!updatedMenu) throw new Error("Menú no encontrado");
    return MenuTransformer.toMenuResponseDTO(updatedMenu);
  }
}