import { z } from "zod";

// 🟢 Validación para crear una reserva
export const CreateReservationSchema = z.object({
  restauranteId: z.string().optional(), // requerido según el rol
  usuarioId: z.string().optional(),     // requerido si lo crea un superadmin o manager
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Formato de fecha inválido (YYYY-MM-DD)"),
  horario: z.string().min(1, "El horario es obligatorio"),
  cantidadAdultos: z.number().min(1, "Debe haber al menos 1 adulto"),
  cantidadNinios: z.number().min(0),
  notas: z.string().max(500, "Máximo 500 caracteres").optional(),
});

// 🟡 Validación para actualizar una reserva
export const UpdateReservationSchema = z.object({
  fecha: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  horario: z.string().min(1).optional(),
  cantidadAdultos: z.number().min(1).optional(),
  cantidadNinios: z.number().min(0).optional(),
  notas: z.string().max(500).optional(),
  estado: z.enum(["Pendiente", "Confirmada", "Cancelada"]).optional(),
});

export const FilterReservationsSchema = z.object({
    usuarioId: z.string().optional(),
    restauranteId: z.string().optional(),
    estado: z.enum(["Pendiente", "Confirmada", "Cancelada"]).optional(),
    desde: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida").optional(),
    hasta: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Fecha inválida").optional(),
  });