import { z } from "zod";
export declare const CreateReviewSchema: z.ZodObject<{
    restauranteId: z.ZodOptional<z.ZodString>;
    usuarioId: z.ZodOptional<z.ZodString>;
    calificacion: z.ZodNumber;
    comentario: z.ZodString;
}, "strip", z.ZodTypeAny, {
    calificacion: number;
    comentario: string;
    restauranteId?: string | undefined;
    usuarioId?: string | undefined;
}, {
    calificacion: number;
    comentario: string;
    restauranteId?: string | undefined;
    usuarioId?: string | undefined;
}>;
export declare const UpdateReviewSchema: z.ZodObject<{
    calificacion: z.ZodOptional<z.ZodNumber>;
    comentario: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    calificacion?: number | undefined;
    comentario?: string | undefined;
}, {
    calificacion?: number | undefined;
    comentario?: string | undefined;
}>;
export declare const ReplyReviewSchema: z.ZodObject<{
    usuarioId: z.ZodString;
    mensaje: z.ZodString;
}, "strip", z.ZodTypeAny, {
    usuarioId: string;
    mensaje: string;
}, {
    usuarioId: string;
    mensaje: string;
}>;
export declare const ReportReviewSchema: z.ZodObject<{
    userId: z.ZodString;
    motivo: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userId: string;
    motivo: string;
}, {
    userId: string;
    motivo: string;
}>;
//# sourceMappingURL=review.schema.d.ts.map