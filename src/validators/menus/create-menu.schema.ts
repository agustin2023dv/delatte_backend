import { z } from "zod";

export const CreateMenuSchema = z.object({
  restauranteId: z.string().regex(/^[a-f\d]{24}$/i, "ID inválido de restaurante"),
  tipo: z.enum(["Comida", "Bebidas", "Postres"]),
  items: z.array(
    z.object({
      nombre: z.string().min(1, "El nombre es obligatorio"),
      descripcion: z.string().min(1, "La descripción es obligatoria"),
      precio: z.number().positive("El precio debe ser positivo"),
    })
  ).min(1, "Debe haber al menos un ítem en el menú"),
});

export type CreateMenuSchemaType = z.infer<typeof CreateMenuSchema>;
