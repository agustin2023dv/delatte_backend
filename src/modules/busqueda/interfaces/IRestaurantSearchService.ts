import { ISearchRestaurantsByNameDTO } from "@delatte/shared/dtos";

export interface IRestaurantSearchService {
  searchRestaurantByName(params: ISearchRestaurantsByNameDTO): Promise<any>;
}
  