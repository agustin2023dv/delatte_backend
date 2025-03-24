import { inject, injectable } from "inversify";
import { IRestaurantLocationService } from "../interfaces/IRestaurantLocationService";
import { IPlacesIntegrationService } from "../../integrations/interfaces/IPlacesIntegrationService";
import { RESTAURANT_LOCATION_TYPES } from "../types/restaurantLocation.types";


@injectable()
export class RestaurantLocationService implements IRestaurantLocationService {
  constructor(
    @inject(RESTAURANT_LOCATION_TYPES.IPlacesIntegrationService)
    private placesService: IPlacesIntegrationService
  ) {}

  async getNearbyRestaurants(lat: number, lng: number, radius: number): Promise<any> {
    return await this.placesService.getPlacesNearby(lat, lng, radius);
  }
}
