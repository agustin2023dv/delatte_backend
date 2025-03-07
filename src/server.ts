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
import favoritesRoutes from './modules/usuarios/routes/favorites.routes';
import addressesRoutes from './modules/usuarios/routes/addresses.routes';

const app = express();
const port = process.env.SERVER_PORT || 8081; // Usa un puerto dinámico si está disponible

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

// Middlewares globales
app.use(cors(corsOptions)); // Habilitar CORS para aceptar solicitudes desde otros dominios


app.use(express.json()); // Permitir recibir solicitudes en formato JSON

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Definir las rutas
app.use('/api/profile', profileRoutes);
app.use("/api/cloudinary", cloudinaryRoutes);
app.use('/api/auth',authRoutes);
app.use('/api/admin',adminRoutes);
app.use('/api/restaurantes', restaurantRoutes);
app.use('/api/reservas', reservationRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/favorites', favoritesRoutes);
app.use('/api/addresses', addressesRoutes);
app.use("/api/menus", menuRoutes);
// Middleware para manejar errores globales con tipado
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error', error: err.message });
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
