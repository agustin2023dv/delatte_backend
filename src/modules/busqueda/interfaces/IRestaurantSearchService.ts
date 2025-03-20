export interface IRestaurantSearchService {
    searchByName(query: string, limit: number): Promise<any>;
  }
  