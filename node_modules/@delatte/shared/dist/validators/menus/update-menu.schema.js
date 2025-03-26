"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMenuSchema = void 0;
const zod_1 = require("zod");
exports.UpdateMenuSchema = zod_1.z.object({
    tipo: zod_1.z.enum(["Comida", "Bebidas", "Postres"]).optional(),
    items: zod_1.z.array(zod_1.z.object({
        nombre: zod_1.z.string().min(1),
        descripcion: zod_1.z.string().min(1),
        precio: zod_1.z.number().positive(),
    })).optional(),
});
