import { Types } from "mongoose";

export interface IReviewResponse {
  usuario: Types.ObjectId | { _id: Types.ObjectId | string; nombre: string };
  mensaje: string;
  fecha: Date;
}

export interface IReviewResponses {
  respuestas?: IReviewResponse[];
}
