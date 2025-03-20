export interface IRestaurantLocationService {
    getNearbyRestaurants(lat: number, lng: number, radius: number): Promise<any>;
  }
  