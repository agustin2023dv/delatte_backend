import { z } from "zod";
export declare const CreateMenuSchema: z.ZodObject<{
    restauranteId: z.ZodString;
    tipo: z.ZodEnum<["Comida", "Bebidas", "Postres"]>;
    items: z.ZodArray<z.ZodObject<{
        nombre: z.ZodString;
        descripcion: z.ZodString;
        precio: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        nombre: string;
        descripcion: string;
        precio: number;
    }, {
        nombre: string;
        descripcion: string;
        precio: number;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    restauranteId: string;
    tipo: "Comida" | "Bebidas" | "Postres";
    items: {
        nombre: string;
        descripcion: string;
        precio: number;
    }[];
}, {
    restauranteId: string;
    tipo: "Comida" | "Bebidas" | "Postres";
    items: {
        nombre: string;
        descripcion: string;
        precio: number;
    }[];
}>;
export type CreateMenuSchemaType = z.infer<typeof CreateMenuSchema>;
//# sourceMappingURL=create-menu.schema.d.ts.map