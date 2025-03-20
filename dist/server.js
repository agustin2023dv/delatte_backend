"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const inversify_express_utils_1 = require("inversify-express-utils");
const db_1 = require("./db");
const inversify_config_1 = require("./configs/inversify.config");
// 🔹 IMPORTACION DE LOS CONTROLADORES PARA QUE SE REGISTREN
require("../src/modules/busqueda/controllers/restaurantSearch.controller");
require("../src/modules/menus/controllers/menuBase.controller");
require("../src/modules/menus/controllers/menuItem.controller");
require("../src/modules/promociones/controllers/promotionAnalytics.controller");
require("../src/modules/promociones/controllers/promotionBase.controller");
require("../src/modules/resenas/controllers/resenaBase.controller");
require("../src/modules/resenas/controllers/resenasAnaliticas.controller");
require("../src/modules/reservas/controllers/reservaBase.controller");
require("../src/modules/reservas/controllers/reservasAnaliticas.controller");
require("../src/modules/restaurantes/controllers/restauranteAnaliticas.controller");
require("../src/modules/restaurantes/controllers/restauranteBase.controller");
require("../src/modules/restaurantes/controllers/restauranteGaleria.controller");
require("../src/modules/restaurantes/controllers/restaurantePermisos.controller");
require("../src/modules/restaurantes/controllers/restauranteUbicacion.controller");
require("../src/modules/usuarios/controllers/userAccess.controller");
require("../src/modules/usuarios/controllers/userAddresses.controller");
require("../src/modules/usuarios/controllers/userAuth.controller");
require("../src/modules/usuarios/controllers/userFavorites.controller");
require("../src/modules/usuarios/controllers/userManagement.controller");
require("../src/modules/usuarios/controllers/userProfile.controller");
// 🔹 Conectar a la base de datos
(0, db_1.connectDB)();
// 🔹 Configurar el servidor con Inversify
const server = new inversify_express_utils_1.InversifyExpressServer(inversify_config_1.container);
server.setConfig((app) => {
    app.use((0, cors_1.default)({
        origin: [
            'http://localhost:8082',
            'http://192.168.1.24:8082',
            'http://localhost:3000',
        ],
        methods: 'GET,POST,PUT,DELETE,PATCH',
        credentials: true,
    }));
    app.use(express_1.default.json());
    app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
});
// 🔹 Construcción de la aplicación Express desde Inversify
const app = server.build();
const port = process.env.SERVER_PORT || 8081;
// 🔹 Iniciar el servidor
app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en el puerto ${port}`);
});
