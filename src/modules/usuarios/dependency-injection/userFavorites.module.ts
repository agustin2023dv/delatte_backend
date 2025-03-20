import { ContainerModule } from "inversify";
import { USER_FAVORITES_TYPES } from "../types/userFavorites.types";
import { UserFavoritesRepository } from "../repositories/userFavorites.repository";
import { UserFavoritesService } from "../services/userFavorites.service";

export const userFavoritesModule = new ContainerModule((bind) => {
  bind(USER_FAVORITES_TYPES.UserFavoritesRepository).to(UserFavoritesRepository);
  bind(USER_FAVORITES_TYPES.UserFavoritesService).to(UserFavoritesService);
});