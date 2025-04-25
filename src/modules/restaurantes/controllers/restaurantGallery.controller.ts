// src/modules/restaurantes/controllers/restaurantGallery.controller.ts

import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { RESTAURANT_GALLERY_TYPES } from "../types/restaurantGallery.types";
import { IRestaurantGalleryService } from "../interfaces/IRestaurantGalleryService";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";

@controller("/api/v1/restaurants")
export class RestaurantGalleryController {
  constructor(
    @inject(RESTAURANT_GALLERY_TYPES.IRestaurantGalleryService)
    private restaurantGalleryService: IRestaurantGalleryService
  ) {}

  @httpGet("/:id/gallery")
  async getGalleryPhotos(req: Request, res: Response): Promise<void> {
    try {
      const { id: restaurantId } = req.params;
      const photos = await this.restaurantGalleryService.getGalleryPhotos(restaurantId);
      res.status(200).json({ success: true, photos });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al obtener las fotos de la galería" });
    }
  }

  @httpPost("/:id/gallery",  managerOfRestaurantMiddleware)
  async addPhotoToGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id: restaurantId } = req.params;
      const { photoUrl } = req.body;

      if (!photoUrl) {
        res.status(400).json({ success: false, message: "Falta la URL de la foto" });
        return;
      }

      const updatedGallery = await this.restaurantGalleryService.addPhotoToGallery(
        restaurantId,
        photoUrl
      );

      res.status(200).json({ success: true, gallery: updatedGallery });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al agregar la foto a la galería" });
    }
  }

  @httpDelete("/:id/gallery",  managerOfRestaurantMiddleware)
  async removePhotoFromGallery(req: Request, res: Response): Promise<void> {
    try {
      const { id: restaurantId } = req.params;
      const { photoUrl } = req.body;

      if (!photoUrl) {
        res.status(400).json({ success: false, message: "URL de la foto es requerida" });
        return;
      }

      const updatedGallery = await this.restaurantGalleryService.removePhotoFromGallery(
        restaurantId,
        photoUrl
      );

      res.status(200).json({ success: true, gallery: updatedGallery });
    } catch (error) {
      res.status(500).json({ success: false, message: "Error al eliminar la foto de la galería" });
    }
  }
}
