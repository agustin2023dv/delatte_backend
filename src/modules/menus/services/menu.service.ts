import { IMenu, IMenuItem } from "@delatte/shared/interfaces";
import { MenuRepository } from "../repositories/menu.repository";

export class MenuService {
  //* 📌 Obtener todos los menús de un restaurante
  static async getMenusByRestaurant(restaurantId: string): Promise<IMenu[]> {
    return await MenuRepository.getMenusByRestaurant(restaurantId);
  }

  //* 📌 Crear un nuevo menú
  static async createMenu(menuData: Partial<IMenu>): Promise<IMenu> {
    return await MenuRepository.createMenu(menuData);
  }

  //* 📌 Actualizar un menú existente
  static async updateMenu(menuId: string, updatedData: Partial<IMenu>): Promise<IMenu | null> {
    return await MenuRepository.updateMenu(menuId, updatedData);
  }

  //* 📌 Eliminar un menú
  static async deleteMenu(menuId: string): Promise<IMenu | null> {
    return await MenuRepository.deleteMenu(menuId);
  }

  //* 📌 Agregar un ítem a un menú
  static async addMenuItem(menuId: string, itemData: IMenuItem): Promise<IMenu | null> {
    return await MenuRepository.addMenuItem(menuId, itemData);
  }

  //* 📌 Eliminar un ítem de un menú
  static async removeMenuItem(menuId: string, itemId: string): Promise<IMenu | null> {
    return await MenuRepository.removeMenuItem(menuId, itemId);
  }
}
