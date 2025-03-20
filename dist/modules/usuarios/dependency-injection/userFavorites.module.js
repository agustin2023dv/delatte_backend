"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userFavoritesModule = void 0;
const inversify_1 = require("inversify");
const userFavorites_types_1 = require("../types/userFavorites.types");
const userFavorites_repository_1 = require("../repositories/userFavorites.repository");
const userFavorites_service_1 = require("../services/userFavorites.service");
exports.userFavoritesModule = new inversify_1.ContainerModule((bind) => {
    bind(userFavorites_types_1.USER_FAVORITES_TYPES.UserFavoritesRepository).to(userFavorites_repository_1.UserFavoritesRepository);
    bind(userFavorites_types_1.USER_FAVORITES_TYPES.UserFavoritesService).to(userFavorites_service_1.UserFavoritesService);
});
