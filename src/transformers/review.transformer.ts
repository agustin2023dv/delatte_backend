import { IReportedReviewDTO } from "@delatte/shared/dtos";
import { IReview } from "@delatte/shared/interfaces/Review/IReview";

export class ReviewTransformer {
  static toReportedReviewDTO(review: any): IReportedReviewDTO {
    return {
      _id: review._id.toString(),
      usuario: {
        _id: (review.usuario as any)._id.toString(),
        nombre: (review.usuario as any).nombre,
        apellido: (review.usuario as any).apellido,
        email: (review.usuario as any).email,
      },
      restaurante: {
        _id: (review.restaurante as any)._id.toString(),
        nombre: (review.restaurante as any).nombre,
        direccion: (review.restaurante as any).direccion,
      },
      calificacion: review.calificacion,
      comentario: review.comentario,
      fecha: review.fecha.toISOString(),
      status: "reported",
    };
  }

  static toManyReportedReviews(reviews: any[]): IReportedReviewDTO[] {
    return reviews.map(this.toReportedReviewDTO);
  }
}
