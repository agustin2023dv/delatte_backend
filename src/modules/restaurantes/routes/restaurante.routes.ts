import { Router } from 'express';
import { registerRestaurantAndManagerController, getRestaurantByIdController, 
  updateRestaurantController, getRestaurantsByManagerIdController, 
  getAllRestaurantsController,
  getSearchResultsController,
  removePhotoFromGalleryController,
  addPhotoToGalleryController,
  getGalleryPhotosController,
  checkManagerRoleController,
  getNearbyRestaurantsController} 
from '../controllers/restaurante.controller';
import { authMiddleware } from '../../../middlewares/auth.middleware';
import { managerOfRestaurantMiddleware } from '../../../middlewares/restaurant.middleware';
import { uploadMiddleware } from '../../../middlewares/upload.middleware';
import { validateLocationParams } from '../../../middlewares/location.middleware';



const router = Router();

//*Ruta para OBTENER todos los restaurantes
router.get('/',
  getAllRestaurantsController
);

//* Ruta para buscar restaurantes por ubicación o tipo de comida
 router.get('/search', 
  getSearchResultsController );

//* Ruta para CREAR un restaurante (solo superadmins o managers pueden crear)
router.post(
  '/register-restaurant', 
  registerRestaurantAndManagerController
);

//* Ruta para OBTENER la información de un restaurante (cualquier usuario autenticado puede acceder)
router.get(
  '/:id', 
  getRestaurantByIdController
);

//* Ruta para ACTUALIZAR la información de un restaurante (solo el manager del restaurante o superadmin puede actualizar)
router.put(
  '/:id', 
  authMiddleware, 
  managerOfRestaurantMiddleware, // Verificar que sea el manager del restaurante o superadmin
  updateRestaurantController
);

//*Ruta para obtener los restaurantes gestionados por un manager  
router.get('/managerId/:id', 
  getRestaurantsByManagerIdController);




//* Rutas relacionadas con la galería de fotos
router.get("/:id/gallery", authMiddleware, getGalleryPhotosController);

router.post(
  "/:id/gallery",
  authMiddleware,
  managerOfRestaurantMiddleware, 
  uploadMiddleware, // Middleware de multer para manejar la subida de archivos
  addPhotoToGalleryController
);

router.delete(
  "/:id/gallery",
  authMiddleware,
  managerOfRestaurantMiddleware, 
  removePhotoFromGalleryController
);

router.get('/:restaurantId/is-manager', 
  authMiddleware, 
  checkManagerRoleController);
  
// Ruta para obtener restaurantes cercanos
router.get("/nearby/:lng/:lat/:radius", 
  validateLocationParams, 
  getNearbyRestaurantsController);

export default router;
