"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("module-alias/register");
const express_1 = __importDefault(require("express"));
const profile_routes_1 = __importDefault(require("./routes/profile.routes"));
const restaurante_routes_1 = __importDefault(require("./routes/restaurante.routes"));
const reserva_routes_1 = __importDefault(require("./routes/reserva.routes"));
const favorites_routes_1 = __importDefault(require("./routes/favorites.routes"));
const addresses_routes_1 = __importDefault(require("./routes/addresses.routes"));
const resena_routes_1 = __importDefault(require("./routes/resena.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const cloudinary_routes_1 = __importDefault(require("./routes/cloudinary.routes"));
const db_1 = require("./db");
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const menu_routes_1 = __importDefault(require("./routes/menu.routes"));
const app = (0, express_1.default)();
const port = process.env.SERVER_PORT || 8081; // Usa un puerto dinámico si está disponible
// Conectar a la base de datos
(0, db_1.connectDB)();
// Mostrar las variables de entorno del servicio SMTP para depuración (solo en desarrollo)
if (process.env.NODE_ENV !== 'production') {
    console.log({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: process.env.SMTP_SECURE,
        user: process.env.SMTP_USER,
    });
}
const corsOptions = {
    origin: ['http://localhost:8082',
        'http://192.168.1.24:8082',
        'http://localhost:3000',], // Permitir solicitudes desde el frontend
    methods: 'GET,POST,PUT,DELETE,PATCH', // Métodos permitidos
    credentials: true,
};
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente.');
});
// Middlewares globales
app.use((0, cors_1.default)(corsOptions)); // Habilitar CORS para aceptar solicitudes desde otros dominios
app.use(express_1.default.json()); // Permitir recibir solicitudes en formato JSON
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Definir las rutas
app.use('/api/profile', profile_routes_1.default);
app.use("/api/cloudinary", cloudinary_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/admin', admin_routes_1.default);
app.use('/api/restaurantes', restaurante_routes_1.default);
app.use('/api/reservas', reserva_routes_1.default);
app.use('/api/reviews', resena_routes_1.default);
app.use('/api/favorites', favorites_routes_1.default);
app.use('/api/addresses', addresses_routes_1.default);
app.use("/api/menus", menu_routes_1.default);
// Middleware para manejar errores globales con tipado
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
});
// Iniciar el servidor
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
