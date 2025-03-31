import { z } from "zod";
export declare const CreateReservationSchema: z.ZodObject<{
    restauranteId: z.ZodOptional<z.ZodString>;
    usuarioId: z.ZodOptional<z.ZodString>;
    fecha: z.ZodString;
    horario: z.ZodString;
    cantidadAdultos: z.ZodNumber;
    cantidadNinios: z.ZodNumber;
    notas: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    fecha: string;
    horario: string;
    cantidadAdultos: number;
    cantidadNinios: number;
    restauranteId?: string | undefined;
    usuarioId?: string | undefined;
    notas?: string | undefined;
}, {
    fecha: string;
    horario: string;
    cantidadAdultos: number;
    cantidadNinios: number;
    restauranteId?: string | undefined;
    usuarioId?: string | undefined;
    notas?: string | undefined;
}>;
export declare const UpdateReservationSchema: z.ZodObject<{
    fecha: z.ZodOptional<z.ZodString>;
    horario: z.ZodOptional<z.ZodString>;
    cantidadAdultos: z.ZodOptional<z.ZodNumber>;
    cantidadNinios: z.ZodOptional<z.ZodNumber>;
    notas: z.ZodOptional<z.ZodString>;
    estado: z.ZodOptional<z.ZodEnum<["Pendiente", "Confirmada", "Cancelada"]>>;
}, "strip", z.ZodTypeAny, {
    fecha?: string | undefined;
    horario?: string | undefined;
    cantidadAdultos?: number | undefined;
    cantidadNinios?: number | undefined;
    notas?: string | undefined;
    estado?: "Confirmada" | "Cancelada" | "Pendiente" | undefined;
}, {
    fecha?: string | undefined;
    horario?: string | undefined;
    cantidadAdultos?: number | undefined;
    cantidadNinios?: number | undefined;
    notas?: string | undefined;
    estado?: "Confirmada" | "Cancelada" | "Pendiente" | undefined;
}>;
export declare const FilterReservationsSchema: z.ZodObject<{
    usuarioId: z.ZodOptional<z.ZodString>;
    restauranteId: z.ZodOptional<z.ZodString>;
    estado: z.ZodOptional<z.ZodEnum<["Pendiente", "Confirmada", "Cancelada"]>>;
    desde: z.ZodOptional<z.ZodString>;
    hasta: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    restauranteId?: string | undefined;
    usuarioId?: string | undefined;
    estado?: "Confirmada" | "Cancelada" | "Pendiente" | undefined;
    desde?: string | undefined;
    hasta?: string | undefined;
}, {
    restauranteId?: string | undefined;
    usuarioId?: string | undefined;
    estado?: "Confirmada" | "Cancelada" | "Pendiente" | undefined;
    desde?: string | undefined;
    hasta?: string | undefined;
}>;
//# sourceMappingURL=reservation.schema.d.ts.map