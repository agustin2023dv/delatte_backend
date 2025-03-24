import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IRestaurantSearchService } from "../interfaces/IRestaurantSearchService";
import { SEARCH_RESTAURANT_TYPES } from "../types/restaurantSearch.types";
import { IRestaurantSearchRepository } from "../interfaces/IRestaurantSearchRespository";
import { ISearchRestaurantsByNameDTO } from "@delatte/shared/dtos";

@injectable()
export class RestaurantSearchService implements IRestaurantSearchService {
  private repository: IRestaurantSearchRepository;

  constructor(
    @inject(SEARCH_RESTAURANT_TYPES.IRestaurantSearchRepository) repository: IRestaurantSearchRepository
  ) {
    this.repository = repository;
  }

  async searchRestaurantByName(params: ISearchRestaurantsByNameDTO): Promise<any> {
    const { q, limit = 10 } = params;
    return await this.repository.searchRestaurantByName({ q, limit });
  }
}
