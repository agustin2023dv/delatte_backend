import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { RESTAURANT_GALLERY_TYPES } from "../types/restaurantGallery.types";
import { IRestaurantGalleryService } from "../interfaces/IRestaurantGalleryService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";
import { uploadMiddleware } from "../../../middlewares/upload.middleware";

@controller("/api/v1/restaurants")
export class RestaurantGalleryController {
  constructor(
    @inject(RESTAURANT_GALLERY_TYPES.IRestaurantGalleryService)
    private restaurantGalleryService: IRestaurantGalleryService
  ) {}

  /**
   * @swagger
   * /api/v1/restaurants/{id}/gallery:
   *   get:
   *     summary: Obtener fotos de la galería de un restaurante
   *     description: Devuelve todas las fotos asociadas a un restaurante.
   *     tags:
   *       - Restaurants
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Galería obtenida con éxito.
   */
  @httpGet("/:id/gallery", authMiddleware)
  async getGalleryPhotos(req: Request, res: Response): Promise<void> {
    try {
      const { id: restaurantId } = req.params;
      const photos = await this.restaurantGalleryService.getGalleryPhotos(restaurantId);
      res.status(200).json({ success: true, photos });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al obtener las fotos de la galería" });
    }
  }

  /**
   * @swagger
   * /api/v1/restaurants/{id}/gallery:
   *   post:
   *     summary: Agregar foto a la galería de un restaurante
   *     description: Permite a un manager o superadmin subir fotos a la galería de un restaurante.
   *     tags:
   *       - Restaurants
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Foto añadida con éxito.
   */
  @httpPost("/:id/gallery", authMiddleware, managerOfRestaurantMiddleware, uploadMiddleware)
  async addPhotoToGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id: restaurantId } = req.params;

      if (!req.file) {
        res.status(400).json({ success: false, message: "No se subió ninguna foto" });
        return;
      }

      const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
      const updatedGallery = await this.restaurantGalleryService.addPhotoToGallery(restaurantId, photoUrl);

      res.status(200).json({ success: true, gallery: updatedGallery });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al agregar la foto a la galería" });
    }
  }

  /**
   * @swagger
   * /api/v1/restaurants/{id}/gallery:
   *   delete:
   *     summary: Eliminar una foto de la galería
   *     description: Permite a un manager o superadmin eliminar fotos de la galería de un restaurante.
   *     tags:
   *       - Restaurants
   *     security:
   *       - BearerAuth: []
   *     responses:
   *       200:
   *         description: Foto eliminada con éxito.
   */
  @httpDelete("/:id/gallery", authMiddleware, managerOfRestaurantMiddleware)
  async removePhotoFromGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id: restaurantId } = req.params;
      const { photoUrl } = req.body;

      if (!photoUrl) {
        res.status(400).json({ success: false, message: "URL de la foto es requerida" });
        return;
      }

      const updatedGallery = await this.restaurantGalleryService.removePhotoFromGallery(restaurantId, photoUrl);
      res.status(200).json({ success: true, gallery: updatedGallery });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al eliminar la foto de la galería" });
    }
  }
}
