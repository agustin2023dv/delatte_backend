"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateMenuSchema = void 0;
const zod_1 = require("zod");
exports.CreateMenuSchema = zod_1.z.object({
    restauranteId: zod_1.z.string().regex(/^[a-f\d]{24}$/i, "ID inválido de restaurante"),
    tipo: zod_1.z.enum(["Comida", "Bebidas", "Postres"]),
    items: zod_1.z.array(zod_1.z.object({
        nombre: zod_1.z.string().min(1, "El nombre es obligatorio"),
        descripcion: zod_1.z.string().min(1, "La descripción es obligatoria"),
        precio: zod_1.z.number().positive("El precio debe ser positivo"),
    })).min(1, "Debe haber al menos un ítem en el menú"),
});
