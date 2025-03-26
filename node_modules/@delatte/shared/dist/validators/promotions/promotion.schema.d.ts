import { z } from "zod";
export declare const CreatePromotionSchema: z.ZodEffects<z.ZodObject<{
    titulo: z.ZodString;
    descripcion: z.ZodString;
    fechaInicio: z.ZodEffects<z.ZodString, string, string>;
    fechaFin: z.ZodEffects<z.ZodString, string, string>;
    descuento: z.ZodNumber;
    restauranteIds: z.ZodOptional<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    descripcion: string;
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
    descuento: number;
    restauranteIds?: string[] | undefined;
}, {
    descripcion: string;
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
    descuento: number;
    restauranteIds?: string[] | undefined;
}>, {
    descripcion: string;
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
    descuento: number;
    restauranteIds?: string[] | undefined;
}, {
    descripcion: string;
    titulo: string;
    fechaInicio: string;
    fechaFin: string;
    descuento: number;
    restauranteIds?: string[] | undefined;
}>;
export declare const UpdatePromotionSchema: z.ZodEffects<z.ZodObject<{
    titulo: z.ZodOptional<z.ZodString>;
    descripcion: z.ZodOptional<z.ZodString>;
    fechaInicio: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    fechaFin: z.ZodOptional<z.ZodEffects<z.ZodString, string, string>>;
    descuento: z.ZodOptional<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    descripcion?: string | undefined;
    titulo?: string | undefined;
    fechaInicio?: string | undefined;
    fechaFin?: string | undefined;
    descuento?: number | undefined;
}, {
    descripcion?: string | undefined;
    titulo?: string | undefined;
    fechaInicio?: string | undefined;
    fechaFin?: string | undefined;
    descuento?: number | undefined;
}>, {
    descripcion?: string | undefined;
    titulo?: string | undefined;
    fechaInicio?: string | undefined;
    fechaFin?: string | undefined;
    descuento?: number | undefined;
}, {
    descripcion?: string | undefined;
    titulo?: string | undefined;
    fechaInicio?: string | undefined;
    fechaFin?: string | undefined;
    descuento?: number | undefined;
}>;
//# sourceMappingURL=promotion.schema.d.ts.map