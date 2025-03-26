"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePromotionSchema = exports.CreatePromotionSchema = void 0;
const zod_1 = require("zod");
// 👉 Zod Schema para crear promoción (ICreatePromotionDTO)
exports.CreatePromotionSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(1, "El título es obligatorio"),
    descripcion: zod_1.z.string().max(500, "Máximo 500 caracteres"),
    fechaInicio: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Fecha de inicio inválida",
    }),
    fechaFin: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Fecha de fin inválida",
    }),
    descuento: zod_1.z.number().min(1, "Mínimo 1%").max(100, "Máximo 100%"),
    restauranteIds: zod_1.z.array(zod_1.z.string()).optional(),
}).refine((data) => new Date(data.fechaInicio) < new Date(data.fechaFin), {
    message: "La fecha de inicio debe ser anterior a la de fin",
    path: ["fechaFin"],
});
// 👉 Zod Schema para actualizar promoción (IUpdatePromotionDTO)
exports.UpdatePromotionSchema = zod_1.z.object({
    titulo: zod_1.z.string().min(1).optional(),
    descripcion: zod_1.z.string().max(500).optional(),
    fechaInicio: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Fecha de inicio inválida",
    }).optional(),
    fechaFin: zod_1.z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Fecha de fin inválida",
    }).optional(),
    descuento: zod_1.z.number().min(1).max(100).optional(),
}).refine((data) => !data.fechaInicio || !data.fechaFin || new Date(data.fechaInicio) < new Date(data.fechaFin), {
    message: "La fecha de inicio debe ser anterior a la de fin",
    path: ["fechaFin"],
});
