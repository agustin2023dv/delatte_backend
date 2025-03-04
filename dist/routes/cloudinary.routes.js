"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_config_1 = __importDefault(require("../configs/cloudinary.config"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/generate-signature/restaurantes", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "delatte/restaurantes";
    const signature = cloudinary_config_1.default.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET);
    res.json({ timestamp, signature });
});
router.get("/generate-signature/perfil-restaurantes", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "delatte/perfil_restaurantes";
    const signature = cloudinary_config_1.default.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET);
    res.json({ timestamp, signature, folder });
});
router.get("/generate-signature/perfil-usuarios", (req, res) => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const folder = "delatte/perfil_usuarios";
    const signature = cloudinary_config_1.default.utils.api_sign_request({ timestamp, folder }, process.env.CLOUDINARY_API_SECRET);
    res.json({ timestamp, signature, folder });
});
exports.default = router;
