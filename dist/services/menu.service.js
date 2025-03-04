"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeMenuItemService = exports.addMenuItemService = exports.deleteMenuService = exports.updateMenuService = exports.createMenuService = exports.getMenusByRestaurantService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Menu_model_1 = __importDefault(require("../models/Menu.model"));
// Obtener todos los menús de un restaurante
const getMenusByRestaurantService = async (restaurantId) => {
    return await Menu_model_1.default.find({ restaurante: new mongoose_1.default.Types.ObjectId(restaurantId) });
};
exports.getMenusByRestaurantService = getMenusByRestaurantService;
// Crear un nuevo menú
const createMenuService = async (menuData) => {
    const newMenu = new Menu_model_1.default(menuData);
    return await newMenu.save();
};
exports.createMenuService = createMenuService;
// Actualizar un menú existente
const updateMenuService = async (menuId, updatedData) => {
    return await Menu_model_1.default.findByIdAndUpdate(menuId, updatedData, { new: true });
};
exports.updateMenuService = updateMenuService;
// Eliminar un menú
const deleteMenuService = async (menuId) => {
    return await Menu_model_1.default.findByIdAndDelete(menuId);
};
exports.deleteMenuService = deleteMenuService;
// Agregar un ítem a un menú
const addMenuItemService = async (menuId, itemData) => {
    return await Menu_model_1.default.findByIdAndUpdate(menuId, { $push: { items: itemData } }, { new: true });
};
exports.addMenuItemService = addMenuItemService;
// Eliminar un ítem de un menú
const removeMenuItemService = async (menuId, itemId) => {
    return await Menu_model_1.default.findByIdAndUpdate(menuId, { $pull: { items: { _id: new mongoose_1.default.Types.ObjectId(itemId) } } }, { new: true });
};
exports.removeMenuItemService = removeMenuItemService;
