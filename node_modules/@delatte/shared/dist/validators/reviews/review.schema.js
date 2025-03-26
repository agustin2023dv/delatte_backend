"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportReviewSchema = exports.ReplyReviewSchema = exports.UpdateReviewSchema = exports.CreateReviewSchema = void 0;
const zod_1 = require("zod");
// ✅ Crear una nueva review
exports.CreateReviewSchema = zod_1.z.object({
    restauranteId: zod_1.z.string().optional(), // requerido según el rol
    usuarioId: zod_1.z.string().optional(),
    calificacion: zod_1.z.number()
        .min(1, "La calificación mínima es 1")
        .max(5, "La calificación máxima es 5"),
    comentario: zod_1.z.string().min(1, "El comentario no puede estar vacío"),
});
// ✅ Actualizar una review existente
exports.UpdateReviewSchema = zod_1.z.object({
    calificacion: zod_1.z.number().min(1).max(5).optional(),
    comentario: zod_1.z.string().min(1).optional(),
});
// ✅ Responder una review
exports.ReplyReviewSchema = zod_1.z.object({
    usuarioId: zod_1.z.string().min(1, "El ID del usuario es obligatorio"),
    mensaje: zod_1.z.string().min(1, "El mensaje no puede estar vacío").max(500, "Máximo 500 caracteres"),
});
// ✅ Reportar una review
exports.ReportReviewSchema = zod_1.z.object({
    userId: zod_1.z.string().min(1, "El ID del usuario es obligatorio"),
    motivo: zod_1.z.string().min(3, "Debes indicar un motivo").max(300, "Máximo 300 caracteres"),
});
