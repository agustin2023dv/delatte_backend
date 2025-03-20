export type ReviewStatus = "publicada" | "reported" | "borrada";

export interface IReviewStatus {
  ultimaActualizacion?: Date; // Fecha de última actualización si fue editada
  status: ReviewStatus; // Estado de la reseña
}
