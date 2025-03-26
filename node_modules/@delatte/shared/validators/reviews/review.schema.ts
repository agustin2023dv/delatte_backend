import { z } from "zod";

// ✅ Crear una nueva review
export const CreateReviewSchema = z.object({
  restauranteId: z.string().optional(), // requerido según el rol
  usuarioId: z.string().optional(),
  calificacion: z.number()
    .min(1, "La calificación mínima es 1")
    .max(5, "La calificación máxima es 5"),
  comentario: z.string().min(1, "El comentario no puede estar vacío"),
});

// ✅ Actualizar una review existente
export const UpdateReviewSchema = z.object({
  calificacion: z.number().min(1).max(5).optional(),
  comentario: z.string().min(1).optional(),
});

// ✅ Responder una review
export const ReplyReviewSchema = z.object({
  usuarioId: z.string().min(1, "El ID del usuario es obligatorio"),
  mensaje: z.string().min(1, "El mensaje no puede estar vacío").max(500, "Máximo 500 caracteres"),
});

// ✅ Reportar una review
export const ReportReviewSchema = z.object({
  userId: z.string().min(1, "El ID del usuario es obligatorio"),
  motivo: z.string().min(3, "Debes indicar un motivo").max(300, "Máximo 300 caracteres"),
});
