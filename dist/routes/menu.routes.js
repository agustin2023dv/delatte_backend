"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_controller_1 = require("../controllers/menu.controller");
const router = express_1.default.Router();
// Rutas con más especificidad primero
router.post("/:menuId/items", menu_controller_1.addMenuItemController);
router.delete("/:menuId/items/:itemId", menu_controller_1.removeMenuItemController);
// CRUD de Menú
router.post("/", menu_controller_1.createMenuController);
router.put("/:menuId", menu_controller_1.updateMenuController);
router.delete("/:menuId", menu_controller_1.deleteMenuController);
// Obtener menús de un restaurante
router.get("/restaurant/:restaurantId", menu_controller_1.getMenusByRestaurantController);
exports.default = router;
