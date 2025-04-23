import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../modules/usuarios/models/User.model';
import { AuthRequest } from '../../types';

/**
 * Middleware de autenticación.
 * Verifica el token JWT y agrega `req.user` si es válido.
 * Excluye automáticamente rutas públicas como login, register, OAuth, etc.
 */
export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const publicRoutes = [
    '/auth/login',
    '/auth/google',
    '/auth/register',
    '/users',
    '/users/email-verification',
    '/users/password-reset-requests',
    '/users/password-resets',
  ];

  const isPublic = publicRoutes.some((route) => req.path.startsWith(route));
  if (isPublic) return next();

  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    res.status(401).json({ message: "No se proporcionó un token de autenticación" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id);

    if (!user) {
      res.status(401).json({ message: "Token inválido" });
      return;
    }

    req.user = user;
    req.userId = user.id; // ✅ útil para controladores que usan `req.userId`
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token inválido o expirado",
      error: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};


export const extractResetTokenMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token no proporcionado o inválido' });
  }

  const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"
  req.body.token = token; // Agregar el token al cuerpo para su uso posterior
  next();
};