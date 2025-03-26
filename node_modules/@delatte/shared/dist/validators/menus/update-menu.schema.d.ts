import { z } from "zod";
export declare const UpdateMenuSchema: z.ZodObject<{
    tipo: z.ZodOptional<z.ZodEnum<["Comida", "Bebidas", "Postres"]>>;
    items: z.ZodOptional<z.ZodArray<z.ZodObject<{
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
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    tipo?: "Comida" | "Bebidas" | "Postres" | undefined;
    items?: {
        nombre: string;
        descripcion: string;
        precio: number;
    }[] | undefined;
}, {
    tipo?: "Comida" | "Bebidas" | "Postres" | undefined;
    items?: {
        nombre: string;
        descripcion: string;
        precio: number;
    }[] | undefined;
}>;
export type UpdateMenuSchemaType = z.infer<typeof UpdateMenuSchema>;
//# sourceMappingURL=update-menu.schema.d.ts.map