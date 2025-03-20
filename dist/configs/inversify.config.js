"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.container = void 0;
const inversify_1 = require("inversify");
const inversify_binding_decorators_1 = require("inversify-binding-decorators");
// Importamos los módulos DI de cada área
const userManagement_module_1 = require("../modules/usuarios/dependency-injection/userManagement.module");
const userAccess_module_1 = require("../modules/usuarios/dependency-injection/userAccess.module");
const userFavorites_module_1 = require("../modules/usuarios/dependency-injection/userFavorites.module");
const userAddresses_module_1 = require("../modules/usuarios/dependency-injection/userAddresses.module");
const userProfile_module_1 = require("../modules/usuarios/dependency-injection/userProfile.module");
const restaurantBase_module_1 = require("../modules/restaurantes/dependency-injection/restaurantBase.module");
const restaurantStats_module_1 = require("../modules/restaurantes/dependency-injection/restaurantStats.module");
const restaurantGallery_module_1 = require("../modules/restaurantes/dependency-injection/restaurantGallery.module");
const restaurantPermissions_module_1 = require("../modules/restaurantes/dependency-injection/restaurantPermissions.module");
const reservationBase_module_1 = require("../modules/reservas/dependency-injection/reservationBase.module");
const reservationAnalytics_module_1 = require("../modules/reservas/dependency-injection/reservationAnalytics.module");
const promotionBase_module_1 = require("../modules/promociones/dependency-injection/promotionBase.module");
const promotionAnalytics_module_1 = require("../modules/promociones/dependency-injection/promotionAnalytics.module");
const menuBase_module_1 = require("../modules/menus/dependency-injection/menuBase.module");
const menuItem_module_1 = require("../modules/menus/dependency-injection/menuItem.module");
const restaurantSearch_module_1 = require("../modules/busqueda/dependency-injection/restaurantSearch.module");
const restaurantLocation_module_1 = require("@modules/restaurantes/dependency-injection/restaurantLocation.module");
const reviewAnalytics_module_1 = require("@modules/resenas/dependency-injection/reviewAnalytics.module");
const reviewBase_module_1 = require("@modules/resenas/dependency-injection/reviewBase.module");
// 🔹 Creamos el contenedor de Inversify
const container = new inversify_1.Container();
exports.container = container;
// 🔹 Carga automática de clases con @provide y @controller
container.load((0, inversify_binding_decorators_1.buildProviderModule)());
// 🔹 Carga de módulos DI (sin iniciar un servidor)
container.load(menuItem_module_1.menusItemModule, menuBase_module_1.menuBaseModule, promotionBase_module_1.promotionsBaseModule, promotionAnalytics_module_1.promotionsAnalyticsModule, reservationBase_module_1.reservationBaseModule, reservationAnalytics_module_1.reservationAnalyticsModule, restaurantSearch_module_1.restaurantSearchModule, restaurantBase_module_1.restaurantBaseModule, restaurantStats_module_1.restaurantStatsModule, restaurantLocation_module_1.restaurantLocationModule, restaurantGallery_module_1.restaurantGalleryModule, restaurantPermissions_module_1.restaurantPermissionsModule, reviewAnalytics_module_1.reviewsAnalyticsModule, reviewBase_module_1.reviewsBaseModule, userManagement_module_1.userManagementModule, userAccess_module_1.userAcessModule, userFavorites_module_1.userFavoritesModule, userAddresses_module_1.userAddressesModule, userProfile_module_1.userProfileModule);
