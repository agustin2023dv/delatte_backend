import { z } from "zod";

export const UpdateMenuSchema = z.object({
  tipo: z.enum(["Comida", "Bebidas", "Postres"]).optional(),
  items: z.array(
    z.object({
      nombre: z.string().min(1),
      descripcion: z.string().min(1),
      precio: z.number().positive(),
    })
  ).optional(),
});

export type UpdateMenuSchemaType = z.infer<typeof UpdateMenuSchema>;
