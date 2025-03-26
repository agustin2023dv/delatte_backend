/**
 * DTO de salida para devolver los datos completos de una review.
 */
export interface IReviewResponseDTO {
    _id: string;
    restaurante: {
        _id: string;
        nombre: string;
    };
    usuario: {
        _id: string;
        nombre: string;
        apellido: string;
    };
    calificacion: number;
    comentario: string;
    fecha: string;
    status: "publicada" | "reported" | "borrada";
}
//# sourceMappingURL=review-response.dto.d.ts.map