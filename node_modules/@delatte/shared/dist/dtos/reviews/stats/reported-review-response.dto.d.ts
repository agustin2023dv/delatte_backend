/**
 * DTO para representar una review que fue reportada.
 */
export interface IReportedReviewDTO {
    _id: string;
    restaurante: {
        _id: string;
        nombre: string;
        direccion: string;
    };
    usuario: {
        _id: string;
        nombre: string;
        apellido: string;
        email: string;
    };
    calificacion: number;
    comentario: string;
    fecha: string;
    status: "reported";
}
//# sourceMappingURL=reported-review-response.dto.d.ts.map