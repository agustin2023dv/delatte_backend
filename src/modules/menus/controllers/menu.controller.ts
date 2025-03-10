import { Response } from "express";
import { MenuService } from "../services/menu.service";
import { AuthRequest } from "../../../../types";

// Obtener menús por restaurante
export const getMenusByRestaurantController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { restaurantId } = req.params;
    const menus = await MenuService.getMenusByRestaurant(restaurantId);
    res.status(200).json(menus);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los menús." });
  }
};

// Crear un nuevo menú
export const createMenuController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const newMenu = await MenuService.createMenu(req.body);
    res.status(201).json(newMenu);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el menú." });
  }
};

// Actualizar un menú
export const updateMenuController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { menuId } = req.params;
    const updatedMenu = await MenuService.updateMenu(menuId, req.body);
    if (!updatedMenu) {
      res.status(404).json({ message: "Menú no encontrado." });
      return;
    }
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el menú." });
  }
};

// Eliminar un menú
export const deleteMenuController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { menuId } = req.params;
    const deletedMenu = await MenuService.deleteMenu(menuId);
    if (!deletedMenu) {
      res.status(404).json({ message: "Menú no encontrado." });
      return;
    }
    res.status(200).json({ message: "Menú eliminado correctamente." });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el menú." });
  }
};

// Agregar ítem a un menú
export const addMenuItemController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { menuId } = req.params;
    const updatedMenu = await MenuService.addMenuItem(menuId, req.body);
    if (!updatedMenu) {
      res.status(404).json({ message: "Menú no encontrado." });
      return;
    }
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: "Error al agregar ítem al menú." });
  }
};

// Eliminar ítem de un menú
export const removeMenuItemController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { menuId, itemId } = req.params;
    const updatedMenu = await MenuService.removeMenuItem(menuId, itemId);
    if (!updatedMenu) {
      res.status(404).json({ message: "Ítem o menú no encontrado." });
      return;
    }
    res.status(200).json(updatedMenu);
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar ítem del menú." });
  }
};
