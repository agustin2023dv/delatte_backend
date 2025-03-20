import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IRestaurantSearchService } from "../interfaces/IRestaurantSearchService";
import { SEARCH_RESTAURANT_TYPES } from "../types/restaurantSearch.types";
import { IRestaurantSearchRepository } from "../interfaces/IRestaurantSearchRespository";

@injectable()
export class RestaurantSearchService implements IRestaurantSearchService {
  private repository: IRestaurantSearchRepository;

  constructor(
    @inject(SEARCH_RESTAURANT_TYPES.IRestaurantSearchRepository) repository: IRestaurantSearchRepository
  ) {
    this.repository = repository;
  }

  async searchByName(query: string, limit = 10): Promise<any> {
    return await this.repository.searchByName(query, limit);
  }
}
