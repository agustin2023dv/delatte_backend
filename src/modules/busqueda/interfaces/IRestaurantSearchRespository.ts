import { ISearchRestaurantsByNameDTO } from "@delatte/shared/dtos";

export interface IRestaurantSearchRepository {
  searchRestaurantByName(params: ISearchRestaurantsByNameDTO): Promise<any>;
}
  