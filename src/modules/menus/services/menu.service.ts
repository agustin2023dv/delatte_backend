import { IMenu, IMenuItem } from "@delatte/shared/interfaces";
import { MenuRepository } from "../repositories/menu.repository";

// 📌 Obtener todos los menús de un restaurante
export const getMenusByRestaurantService = async (restaurantId: string): Promise<IMenu[]> => {
  return await MenuRepository.getMenusByRestaurant(restaurantId);
};

// 📌 Crear un nuevo menú
export const createMenuService = async (menuData: Partial<IMenu>): Promise<IMenu> => {
  return await MenuRepository.createMenu(menuData);
};

// 📌 Actualizar un menú existente
export const updateMenuService = async (menuId: string, updatedData: Partial<IMenu>): Promise<IMenu | null> => {
  return await MenuRepository.updateMenu(menuId, updatedData);
};

// 📌 Eliminar un menú
export const deleteMenuService = async (menuId: string): Promise<IMenu | null> => {
  return await MenuRepository.deleteMenu(menuId);
};

// 📌 Agregar un ítem a un menú
export const addMenuItemService = async (menuId: string, itemData: IMenuItem): Promise<IMenu | null> => {
  return await MenuRepository.addMenuItem(menuId, itemData);
};

// 📌 Eliminar un ítem de un menú
export const removeMenuItemService = async (menuId: string, itemId: string): Promise<IMenu | null> => {
  return await MenuRepository.removeMenuItem(menuId, itemId);
};
