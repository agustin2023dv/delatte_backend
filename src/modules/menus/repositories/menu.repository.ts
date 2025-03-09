import { IMenu, IMenuItem } from "@delatte/shared/interfaces";
import mongoose from "mongoose";
import Menu from "../models/Menu.model";

export class MenuRepository {
  
  // 📌 Obtener todos los menús de un restaurante
  static async getMenusByRestaurant(restaurantId: string): Promise<IMenu[]> {
    return await Menu.find({ restaurante: new mongoose.Types.ObjectId(restaurantId) });
  }

  // 📌 Crear un nuevo menú
  static async createMenu(menuData: Partial<IMenu>): Promise<IMenu> {
    const newMenu = new Menu(menuData);
    return await newMenu.save();
  }

  // 📌 Actualizar un menú existente
  static async updateMenu(menuId: string, updatedData: Partial<IMenu>): Promise<IMenu | null> {
    return await Menu.findByIdAndUpdate(menuId, updatedData, { new: true });
  }

  // 📌 Eliminar un menú
  static async deleteMenu(menuId: string): Promise<IMenu | null> {
    return await Menu.findByIdAndDelete(menuId);
  }

  // 📌 Agregar un ítem a un menú
  static async addMenuItem(menuId: string, itemData: IMenuItem): Promise<IMenu | null> {
    return await Menu.findByIdAndUpdate(
      menuId,
      { $push: { items: itemData } },
      { new: true }
    );
  }

  // 📌 Eliminar un ítem de un menú
  static async removeMenuItem(menuId: string, itemId: string): Promise<IMenu | null> {
    return await Menu.findByIdAndUpdate(
      menuId,
      { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } },
      { new: true }
    );
  }
}
