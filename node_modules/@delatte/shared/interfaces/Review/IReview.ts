import { Document, ObjectId } from "mongoose";
import { IReviewBase } from "./IReviewBase";
import { IReviewStatus } from "./IReviewStatus";
import { IReviewRestaurant } from "./IReviewRestaurant";
import { IReviewUser } from "./IReviewUser";
import { IReviewReports } from "./IReviewReport";
import { IReviewResponses } from "./IReviewResponse";

export interface IReview 
  extends Omit<Document, "_id">, 
          IReviewBase, 
          IReviewStatus, 
          IReviewRestaurant, 
          IReviewUser, 
          IReviewReports, 
          IReviewResponses {
  _id: ObjectId;
}
