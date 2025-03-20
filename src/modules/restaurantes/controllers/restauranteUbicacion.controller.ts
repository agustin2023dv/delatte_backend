<<<<<<< Updated upstream
import { Response } from "express"; 
import { AuthRequest } from "../../../../types";
import { getPlacesNearbyService } from "../../integrations/services/search.service";

export const getNearbyRestaurantsController = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const { lat, lng, radius } = req.query;
  
      if (!lat || !lng || !radius) {
        res.status(400).json({ message: "Faltan parámetros obligatorios (lat, lng, radius)." });
        return;
      }
  
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);
      const searchRadius = parseInt(radius as string);
  
      if (isNaN(latitude) || isNaN(longitude) || isNaN(searchRadius)) {
        res.status(400).json({ message: "Los parámetros (lat, lng, radius) deben ser números válidos." });
        return;
      }
  
      const nearbyRestaurants = await getPlacesNearbyService(latitude, longitude, searchRadius);
  
      res.status(200).json(nearbyRestaurants.length ? nearbyRestaurants : { message: "No se encontraron restaurantes cercanos." });
    } catch (error) {
      res.status(500).json({ message: "Error al buscar restaurantes cercanos", error });
    }
  };
  
=======
import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { IRestaurantLocationService } from "../interfaces/IRestaurantLocationService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { validateLocationParams } from "../../../middlewares/location.middleware";
import { RESTAURANT_LOCATION_TYPES } from "../types/restaurantLocation.types";

@controller("/api/v1/restaurants")
export class RestaurantLocationController {
  constructor(
    @inject(RESTAURANT_LOCATION_TYPES.IRestaurantLocationService)
    private restaurantLocationService: IRestaurantLocationService
  ) {}

  @httpGet("/nearby", authMiddleware, validateLocationParams)
  async getNearbyRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const { lat, lng, radius } = req.query;
      const latitude = parseFloat(lat as string);
      const longitude = parseFloat(lng as string);
      const searchRadius = parseInt(radius as string);

      const nearbyRestaurants = await this.restaurantLocationService.getNearbyRestaurants(latitude, longitude, searchRadius);

      res.status(200).json(nearbyRestaurants.length ? nearbyRestaurants : { message: "No se encontraron restaurantes cercanos." });
    } catch (error) {
      console.error("Error al buscar restaurantes cercanos:", error);
      res.status(500).json({ message: "Error al buscar restaurantes cercanos", error });
    }
  }
}
>>>>>>> Stashed changes
