"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemRepository = void 0;
const inversify_1 = require("inversify");
const Menu_model_1 = __importDefault(require("../models/Menu.model"));
let MenuItemRepository = class MenuItemRepository {
    async addMenuItem(menuId, itemData) {
        const updatedMenu = await Menu_model_1.default.findByIdAndUpdate(menuId, { $push: { items: itemData } }, { new: true });
        if (!updatedMenu) {
            throw new Error("Menú no encontrado");
        }
        return updatedMenu;
    }
    async removeMenuItem(menuId, itemId) {
        const updatedMenu = await Menu_model_1.default.findByIdAndUpdate(menuId, { $pull: { items: { _id: itemId } } }, { new: true });
        if (!updatedMenu) {
            throw new Error("Menú no encontrado");
        }
        return updatedMenu;
    }
    async updateMenuItem(menuId, itemId, itemData) {
        const updatedMenu = await Menu_model_1.default.findByIdAndUpdate(menuId, {
            $set: { "items.$[elem]": itemData }
        }, {
            new: true,
            arrayFilters: [{ "elem._id": itemId }]
        });
        if (!updatedMenu) {
            throw new Error("Menú no encontrado");
        }
        return updatedMenu;
    }
};
exports.MenuItemRepository = MenuItemRepository;
exports.MenuItemRepository = MenuItemRepository = __decorate([
    (0, inversify_1.injectable)()
], MenuItemRepository);
