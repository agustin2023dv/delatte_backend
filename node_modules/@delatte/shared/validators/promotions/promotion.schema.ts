import { z } from "zod";

// 👉 Zod Schema para crear promoción (ICreatePromotionDTO)
export const CreatePromotionSchema = z.object({
  titulo: z.string().min(1, "El título es obligatorio"),
  descripcion: z.string().max(500, "Máximo 500 caracteres"),
  fechaInicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de inicio inválida",
  }),
  fechaFin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de fin inválida",
  }),
  descuento: z.number().min(1, "Mínimo 1%").max(100, "Máximo 100%"),
  restauranteIds: z.array(z.string()).optional(),
}).refine((data) => new Date(data.fechaInicio) < new Date(data.fechaFin), {
  message: "La fecha de inicio debe ser anterior a la de fin",
  path: ["fechaFin"],
});

// 👉 Zod Schema para actualizar promoción (IUpdatePromotionDTO)
export const UpdatePromotionSchema = z.object({
  titulo: z.string().min(1).optional(),
  descripcion: z.string().max(500).optional(),
  fechaInicio: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de inicio inválida",
  }).optional(),
  fechaFin: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Fecha de fin inválida",
  }).optional(),
  descuento: z.number().min(1).max(100).optional(),
}).refine(
  (data) =>
    !data.fechaInicio || !data.fechaFin || new Date(data.fechaInicio) < new Date(data.fechaFin),
  {
    message: "La fecha de inicio debe ser anterior a la de fin",
    path: ["fechaFin"],
  }
);
