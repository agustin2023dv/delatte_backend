import mongoose from "mongoose";
import Menu from "../models/Menu.model";
// Obtener todos los menús de un restaurante
export const getMenusByRestaurantService = async (restaurantId) => {
    return await Menu.find({ restaurante: new mongoose.Types.ObjectId(restaurantId) });
};
// Crear un nuevo menú
export const createMenuService = async (menuData) => {
    const newMenu = new Menu(menuData);
    return await newMenu.save();
};
// Actualizar un menú existente
export const updateMenuService = async (menuId, updatedData) => {
    return await Menu.findByIdAndUpdate(menuId, updatedData, { new: true });
};
// Eliminar un menú
export const deleteMenuService = async (menuId) => {
    return await Menu.findByIdAndDelete(menuId);
};
// Agregar un ítem a un menú
export const addMenuItemService = async (menuId, itemData) => {
    return await Menu.findByIdAndUpdate(menuId, { $push: { items: itemData } }, { new: true });
};
// Eliminar un ítem de un menú
export const removeMenuItemService = async (menuId, itemId) => {
    return await Menu.findByIdAndUpdate(menuId, { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } }, { new: true });
};
