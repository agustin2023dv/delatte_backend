import { ContainerModule } from "inversify";
import { IRestaurantLocationService } from "../interfaces/IRestaurantLocationService";
import { RestaurantLocationService } from "../services/restaurantLocation.service";
import { RESTAURANT_LOCATION_TYPES } from "../types/restaurantLocation.types";
import { IPlacesIntegrationService } from "@modules/integrations/interfaces/IPlacesIntegrationService";
import { PlacesIntegrationService } from "@modules/integrations/services/placesIntegration.service";

export const restaurantLocationModule = new ContainerModule((bind) => {
  bind<IRestaurantLocationService>(RESTAURANT_LOCATION_TYPES.IRestaurantLocationService).to(RestaurantLocationService);
  bind<IPlacesIntegrationService>(RESTAURANT_LOCATION_TYPES.IPlacesIntegrationService).to(PlacesIntegrationService);
});
