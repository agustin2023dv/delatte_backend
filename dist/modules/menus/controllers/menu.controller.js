"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMenuItemController = exports.addMenuItemController = exports.deleteMenuController = exports.updateMenuController = exports.createMenuController = exports.getMenusByRestaurantController = void 0;
const menu_service_1 = require("../services/menu.service");
// Obtener menús por restaurante
const getMenusByRestaurantController = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const menus = await (0, menu_service_1.getMenusByRestaurantService)(restaurantId);
        res.status(200).json(menus);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los menús." });
        return;
    }
};
exports.getMenusByRestaurantController = getMenusByRestaurantController;
// Crear un nuevo menú
const createMenuController = async (req, res) => {
    try {
        const newMenu = await (0, menu_service_1.createMenuService)(req.body);
        res.status(201).json(newMenu);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el menú." });
        return;
    }
};
exports.createMenuController = createMenuController;
// Actualizar un menú
const updateMenuController = async (req, res) => {
    try {
        const { menuId } = req.params;
        const updatedMenu = await (0, menu_service_1.updateMenuService)(menuId, req.body);
        if (!updatedMenu) {
            res.status(404).json({ message: "Menú no encontrado." });
            return;
        }
        res.status(200).json(updatedMenu);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error al actualizar el menú." });
        return;
    }
};
exports.updateMenuController = updateMenuController;
// Eliminar un menú
const deleteMenuController = async (req, res) => {
    try {
        const { menuId } = req.params;
        const deletedMenu = await (0, menu_service_1.deleteMenuService)(menuId);
        if (!deletedMenu) {
            res.status(404).json({ message: "Menú no encontrado." });
            return;
        }
        res.status(200).json({ message: "Menú eliminado correctamente." });
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar el menú." });
        return;
    }
};
exports.deleteMenuController = deleteMenuController;
// Agregar ítem a un menú
const addMenuItemController = async (req, res) => {
    try {
        const { menuId } = req.params;
        const updatedMenu = await (0, menu_service_1.addMenuItemService)(menuId, req.body);
        if (!updatedMenu) {
            res.status(404).json({ message: "Menú no encontrado." });
            return;
        }
        res.status(200).json(updatedMenu);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error al agregar ítem al menú." });
        return;
    }
};
exports.addMenuItemController = addMenuItemController;
// Eliminar ítem de un menú
const removeMenuItemController = async (req, res) => {
    try {
        const { menuId, itemId } = req.params;
        const updatedMenu = await (0, menu_service_1.removeMenuItemService)(menuId, itemId);
        if (!updatedMenu) {
            res.status(404).json({ message: "Ítem o menú no encontrado." });
            return;
        }
        res.status(200).json(updatedMenu);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error al eliminar ítem del menú." });
        return;
    }
};
exports.removeMenuItemController = removeMenuItemController;
