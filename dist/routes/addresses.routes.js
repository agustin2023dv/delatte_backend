"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const address_controller_1 = require("../controllers/address.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = express_1.default.Router();
//**RUTAS PARA EL MANEJO DE ADDRESSES**//
router.get("/", auth_middleware_1.authMiddleware, address_controller_1.getUserAddressesController);
router.post("/", auth_middleware_1.authMiddleware, address_controller_1.addAddressController);
router.delete("/", auth_middleware_1.authMiddleware, address_controller_1.removeAddressController);
exports.default = router;
