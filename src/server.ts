import "reflect-metadata"; 
import 'module-alias/register';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { InversifyExpressServer } from "inversify-express-utils";
import { connectDB } from './db';
import { container } from "./configs/inversify.config";

// 🔹 IMPORTACION DE LOS CONTROLADORES PARA QUE SE REGISTREN
import "../src/modules/busqueda/controllers/restaurantSearch.controller";
import "../src/modules/menus/controllers/menuBase.controller";
import "../src/modules/menus/controllers/menuItem.controller";
import "../src/modules/promociones/controllers/promotionAnalytics.controller";
import "../src/modules/promociones/controllers/promotionBase.controller";
import "../src/modules/resenas/controllers/resenaBase.controller";
import "../src/modules/resenas/controllers/resenasAnaliticas.controller";
import "../src/modules/reservas/controllers/reservaBase.controller";
import "../src/modules/reservas/controllers/reservasAnaliticas.controller";
import "./modules/restaurantes/controllers/restaurantAnalyticscontroller";
import "./modules/restaurantes/controllers/restaurantBase.controller";
import "./modules/restaurantes/controllers/restaurantGallery.controller";
import "./modules/restaurantes/controllers/restaurantPermissions.controller";
import "./modules/restaurantes/controllers/restaurantLocation.controller";
import "../src/modules/usuarios/controllers/userAccess.controller";
import "../src/modules/usuarios/controllers/userAddresses.controller";
import "../src/modules/usuarios/controllers/userAuth.controller";
import "../src/modules/usuarios/controllers/userFavorites.controller";
import "../src/modules/usuarios/controllers/userManagement.controller";
import "../src/modules/usuarios/controllers/userProfile.controller";

// 🔹 Conectar a la base de datos
connectDB();

// 🔹 Configurar el servidor con Inversify
const server = new InversifyExpressServer(container);

server.setConfig((app) => {
  app.use(cors({
    origin: [
      'http://localhost:8082',
      'http://192.168.1.24:8082',
      'http://localhost:3000',
    ],
    methods: 'GET,POST,PUT,DELETE,PATCH',
    credentials: true,
  }));

  app.use(express.json());
  app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
});

// 🔹 Construcción de la aplicación Express desde Inversify
const app: express.Application = server.build();

const port = process.env.SERVER_PORT || 8081;

// 🔹 Iniciar el servidor
app.listen(port, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
