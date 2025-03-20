import { Types } from "mongoose";


export interface IReviewUser {
  usuario: Types.ObjectId | { _id: Types.ObjectId | string; nombre: string; apellido: string; email: string };
}
