import 'reflect-metadata';
import 'module-alias/register';
import { InversifyExpressServer } from 'inversify-express-utils';
import { applyMiddlewares } from './config/express';

// Registrar controladores
import '@/modules/busqueda/controllers/restaurantSearch.controller';
import '@/modules/menus/controllers/menuBase.controller';
import '@/modules/menus/controllers/menuItem.controller';
import '@/modules/promociones/controllers/promotionAnalytics.controller';
import '@/modules/promociones/controllers/promotionBase.controller';
import '@/modules/resenas/controllers/reviewBase.controller';
import '@/modules/resenas/controllers/reviewAnalytics.controller';
import '@/modules/reservas/controllers/reservationBase.controller';
import '@/modules/reservas/controllers/reservationAnalytics.controller';
import '@/modules/restaurantes/controllers/restaurantAnalytics.controller';
import '@/modules/restaurantes/controllers/restaurantBase.controller';
import '@/modules/restaurantes/controllers/restaurantGallery.controller';
import '@/modules/restaurantes/controllers/restaurantPermissions.controller';
import '@/modules/restaurantes/controllers/restaurantLocation.controller';
import '@/modules/usuarios/controllers/userAccess.controller';
import '@/modules/usuarios/controllers/userAddresses.controller';
import '@/modules/usuarios/controllers/userAuth.controller';
import '@/modules/usuarios/controllers/userFavorites.controller';
import '@/modules/usuarios/controllers/userManagement.controller';
import '@/modules/usuarios/controllers/userProfile.controller';
import { connectDB } from 'src/db/connectDb';
import { container } from '@configs/inversify.config';

connectDB();

const server = new InversifyExpressServer(container);
server.setConfig(applyMiddlewares);
const app = server.build();

export default app;
