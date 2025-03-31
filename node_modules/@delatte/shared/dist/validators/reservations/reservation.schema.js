"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilterReservationsSchema = exports.UpdateReservationSchema = exports.CreateReservationSchema = void 0;
const zod_1 = require("zod");
// 🟢 Validación para crear una reserva
exports.CreateReservationSchema = zod_1.z.object({
    restauranteId: zod_1.z.string().optional(), // requerido según el rol
    usuarioId: zod_1.z.string().optional(), // requerido si lo crea un superadmin o manager
    fecha: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
    horario: zod_1.z.string().min(1, "El horario es obligatorio"),
    cantidadAdultos: zod_1.z.number().min(1, "Debe haber al menos 1 adulto"),
    cantidadNinios: zod_1.z.number().min(0),
    notas: zod_1.z.string().max(500, "Máximo 500 caracteres").optional(),
});
// 🟡 Validación para actualizar una reserva
exports.UpdateReservationSchema = zod_1.z.object({
    fecha: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
    horario: zod_1.z.string().min(1).optional(),
    cantidadAdultos: zod_1.z.number().min(1).optional(),
    cantidadNinios: zod_1.z.number().min(0).optional(),
    notas: zod_1.z.string().max(500).optional(),
    estado: zod_1.z.enum(["Pendiente", "Confirmada", "Cancelada"]).optional(),
});
exports.FilterReservationsSchema = zod_1.z.object({
    usuarioId: zod_1.z.string().optional(),
    restauranteId: zod_1.z.string().optional(),
    estado: zod_1.z.enum(["Pendiente", "Confirmada", "Cancelada"]).optional(),
    desde: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida").optional(),
    hasta: zod_1.z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida").optional(),
});
