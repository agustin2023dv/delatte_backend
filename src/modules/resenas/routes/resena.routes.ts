import express from 'express';
import { 
  createReviewController, 
  getReviewsByRestaurantController,
  getAllReviewsController,
  getReviewsByUserController,
  updateReviewController, 
  deleteReviewController 
} from '../controllers/resena.controller';

import { validateReview, validateReviewUpdate } from '@delatte/shared/utils';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { roleMiddleware } from '../../../middlewares/role.middleware';

const router = express.Router();

// 🔹 Obtener todas las reseñas (Solo Superadmin)
router.get('/', authMiddleware, roleMiddleware(['superadmin']), getAllReviewsController);

// 🔹 Obtener reseñas por restaurante
router.get('/restaurantId/:id', authMiddleware, getReviewsByRestaurantController);

// 🔹 Obtener reseñas por usuario
router.get('/userId/:id', authMiddleware, getReviewsByUserController);

// 🔹 Crear una nueva reseña (Solo clientes pueden dejar reseñas)
router.post('/create-review', 
    authMiddleware, 
    roleMiddleware(['customer']), 
    validateReview, 
    createReviewController);

// 🔹 Editar una reseña (Solo clientes pueden editar sus reseñas)
router.put('/:id', 
    authMiddleware, 
    roleMiddleware(['customer']),
    validateReviewUpdate, 
    updateReviewController);

// 🔹 Borrar una reseña (Clientes pueden borrar su reseña / Superadmin puede borrar cualquier reseña)
router.delete(
    '/:id/delete', 
    authMiddleware, 
    roleMiddleware(['customer', 'superadmin']), 
    deleteReviewController
  );

export default router;
