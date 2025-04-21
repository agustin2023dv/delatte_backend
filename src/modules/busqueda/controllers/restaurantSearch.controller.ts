import { inject} from "inversify";
import { Request, Response } from "express";
import { controller, httpGet } from "inversify-express-utils";
import "reflect-metadata";
import { IRestaurantSearchService } from "../interfaces/IRestaurantSearchService";
import { SEARCH_RESTAURANT_TYPES } from "../types/restaurantSearch.types";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";

@controller("/api/v1/search/restaurants")
export class RestaurantSearchController  {
  constructor(
    @inject(SEARCH_RESTAURANT_TYPES.IRestaurantSearchService)
    private restaurantSearchService: IRestaurantSearchService
  ) {
  
  }

  @httpGet("/by-name")
  async searchRestaurantByName(req: Request, res: Response): Promise<void> {
    try {
      const query = req.query.q as string;
      const limit = parseInt(req.query.limit as string) || 10;

      console.log(req.query.q );
      if (!query) {
        res.status(400).json({ message: "Parámetro de búsqueda no válido" });
        return;
      }

      const results = await this.restaurantSearchService.searchRestaurantByName({ q: query, limit });
      ;
      res.status(200).json(results);
      console.log(results);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      res.status(500).json({ message: "Error en la búsqueda", error });
    }
  }
}
