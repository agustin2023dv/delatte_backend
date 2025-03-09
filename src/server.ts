import 'module-alias/register';
import express, { Request, Response, NextFunction } from 'express';

import cloudinaryRoutes from "./modules/integrations/routes/cloudinary.routes";
import { connectDB } from './db';
import cors from 'cors';
import path from 'path';
import menuRoutes from './modules/menus/routes/menu.routes';
import restaurantRoutes from './modules/restaurantes/routes/restaurante.routes';
import reviewRoutes from './modules/resenas/routes/resena.routes';
import reservationRoutes from './modules/reservas/routes/reserva.routes';
import profileRoutes from './modules/usuarios/routes/profile.routes';
import authRoutes from './modules/usuarios/routes/auth.routes';
import adminRoutes from './modules/usuarios/routes/admin.routes';
import searchRestaurantRoutes from './modules/busqueda/routes/restauranteBusqueda.routes';
import favoritesRoutes from './modules/usuarios/routes/favorites.routes';
import addressesRoutes from './modules/usuarios/routes/addresses.routes';
import reservasAnaliticasRoutes from './modules/reservas/routes/reservasAnaliticas.routes';
import promocionRoutes from './modules/promociones/routes/promocion.routes';
import { setupSwagger } from './configs/swagger.config';

const app = express();
setupSwagger(app);
const port = process.env.SERVER_PORT || 8081; 

// Conectar a la base de datos
connectDB();

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

app.get('/', (req: Request, res: Response) => {
  res.send('Servidor funcionando correctamente.');
});

const apiV1  = "/api/v1";
// Middlewares globales
app.use(cors(corsOptions)); // Habilitar CORS para aceptar solicitudes desde otros dominios


app.use(express.json()); // Permitir recibir solicitudes en formato JSON

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Definir las rutas
app.use('/api/v1/profile', profileRoutes);
app.use('/api/v1/cloudinary', cloudinaryRoutes);
app.use('/api/v1/promotions', promocionRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/restaurants', restaurantRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use("/api/v1/reservations-analytics", reservasAnaliticasRoutes);
app.use('/api/v1/reviews', reviewRoutes);
app.use('/api/v1/favorites', favoritesRoutes);
app.use('/api/v1/addresses', addressesRoutes);
app.use("/api/v1/menus", menuRoutes);
app.use("/api/v1/search/restaurants", searchRestaurantRoutes);
// Middleware para manejar errores globales con tipado
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
