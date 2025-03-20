import { Container } from "inversify";
import { buildProviderModule } from "inversify-binding-decorators";

// Importamos los módulos DI de cada área
import { userManagementModule } from "../modules/usuarios/dependency-injection/userManagement.module";
import { userAcessModule } from "../modules/usuarios/dependency-injection/userAccess.module";
import { userFavoritesModule } from "../modules/usuarios/dependency-injection/userFavorites.module";
import { userAddressesModule } from "../modules/usuarios/dependency-injection/userAddresses.module";
import { userProfileModule } from "../modules/usuarios/dependency-injection/userProfile.module";
import { restaurantBaseModule } from "../modules/restaurantes/dependency-injection/restaurantBase.module";
import { restaurantStatsModule } from "../modules/restaurantes/dependency-injection/restaurantStats.module";
import { restaurantGalleryModule } from "../modules/restaurantes/dependency-injection/restaurantGallery.module";
import { restaurantPermissionsModule } from "../modules/restaurantes/dependency-injection/restaurantPermissions.module";
import { reservationBaseModule } from "../modules/reservas/dependency-injection/reservationBase.module";
import { reservationAnalyticsModule } from "../modules/reservas/dependency-injection/reservationAnalytics.module";
import { promotionsBaseModule } from "../modules/promociones/dependency-injection/promotionBase.module";
import { promotionsAnalyticsModule } from "../modules/promociones/dependency-injection/promotionAnalytics.module";
import { menuBaseModule } from "../modules/menus/dependency-injection/menuBase.module";
import { menusItemModule } from "../modules/menus/dependency-injection/menuItem.module";
import { restaurantSearchModule } from "../modules/busqueda/dependency-injection/restaurantSearch.module";
import { restaurantLocationModule } from "@modules/restaurantes/dependency-injection/restaurantLocation.module";
import { reviewsAnalyticsModule } from "@modules/resenas/dependency-injection/reviewAnalytics.module";
import { reviewsBaseModule } from "@modules/resenas/dependency-injection/reviewBase.module";

// 🔹 Creamos el contenedor de Inversify
const container = new Container();

// 🔹 Carga automática de clases con @provide y @controller
container.load(buildProviderModule());

// 🔹 Carga de módulos DI (sin iniciar un servidor)
container.load(
  menusItemModule, menuBaseModule,
  promotionsBaseModule, promotionsAnalyticsModule,
  reservationBaseModule, reservationAnalyticsModule,
  restaurantSearchModule, restaurantBaseModule, restaurantStatsModule, restaurantLocationModule,
  restaurantGalleryModule, restaurantPermissionsModule,
  reviewsAnalyticsModule, reviewsBaseModule,
  userManagementModule, userAcessModule, userFavoritesModule,
  userAddressesModule, userProfileModule
);

export { container }; 
