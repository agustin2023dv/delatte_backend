import { ContainerModule } from "inversify";
import { IRestaurantSearchRepository } from "../interfaces/IRestaurantSearchRespository";
import { RestaurantSearchRepository } from "../repositories/restaurantSearch.repository";
import { SEARCH_RESTAURANT_TYPES } from "../types/restaurantSearch.types";
import { RestaurantSearchService } from "../services/restaurantSearch.service";
import { IRestaurantSearchService } from "../interfaces/IRestaurantSearchService";



export const restaurantSearchModule= new ContainerModule((bind) => {
    bind<IRestaurantSearchRepository>(SEARCH_RESTAURANT_TYPES.IRestaurantSearchRepository).to(RestaurantSearchRepository);
    bind<IRestaurantSearchService>(SEARCH_RESTAURANT_TYPES.IRestaurantSearchService).to(RestaurantSearchService);


})

