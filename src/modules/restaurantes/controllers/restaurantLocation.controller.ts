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
