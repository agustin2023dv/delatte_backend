"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const favorite_controller_1 = require("../controllers/favorite.controller");
const router = express_1.default.Router();
router.get("/", auth_middleware_1.authMiddleware, favorite_controller_1.getUserFavoritesController);
// *Ruta para agregar restaurante a favoritos
router.post('/', auth_middleware_1.authMiddleware, favorite_controller_1.addFavoriteRestaurantController);
// *Ruta para eliminar restaurante de favoritos
router.delete('/', auth_middleware_1.authMiddleware, favorite_controller_1.removeFavoriteRestaurantController);
exports.default = router;
