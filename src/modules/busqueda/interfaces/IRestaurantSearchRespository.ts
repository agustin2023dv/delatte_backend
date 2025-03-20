export interface IRestaurantSearchRepository {
    searchByName(query: string, limit: number): Promise<any>;
  }
  