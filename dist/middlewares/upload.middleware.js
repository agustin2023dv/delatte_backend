"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadMiddleware = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Configuración del almacenamiento de archivos
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Carpeta donde se guardarán las fotos subidas
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path_1.default.extname(file.originalname)}`);
    },
});
// Filtro para validar solo imágenes
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    }
    else {
        cb(new Error("Tipo de archivo no permitido. Solo se permiten imágenes."));
    }
};
// Configuración final del middleware
const upload = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize: 2 * 1024 * 1024 }, // Tamaño máximo de 2MB
});
exports.uploadMiddleware = upload.single("photo"); // Para subir un solo archivo
