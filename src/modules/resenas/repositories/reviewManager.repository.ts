import RestaurantModel from "@/modules/restaurantes/models/Restaurant.model";
import {Review} from "@/modules/resenas/models/Review.model";
import { IReview } from "@delatte/shared/interfaces";
import { injectable } from "inversify";
import { IReviewManagerRepository } from "../interfaces/IReviewManagerRepository";

@injectable()
export class ReviewManagerRepository implements IReviewManagerRepository {
  async findReviewsByManagerRestaurants(managerId: string): Promise<IReview[]> {
    const restaurantes = await RestaurantModel.find({
      $or: [
        { 'management.managerPrincipal': managerId },
        { 'management.coManagers': managerId }
      ]
    }).select('_id');

    const ids = restaurantes.map((r) => r._id);

    return Review.find({ restaurante: { $in: ids } })
      .populate('usuario')
      .populate('restaurante');
  }
}
