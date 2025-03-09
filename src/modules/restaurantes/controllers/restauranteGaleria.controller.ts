import { Response } from "express"; 
import { AuthRequest } from "../../../../types";
import { addPhotoToGalleryService, getGalleryPhotosService, 
    removePhotoFromGalleryService } from "../services/restauranteGaleria.service";


// Obtener las fotos de la galería de un restaurante
export const getGalleryPhotosController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: restaurantId } = req.params;
    const photos = await getGalleryPhotosService(restaurantId);

    res.status(200).json({ success: true, photos });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};

// Agregar una foto a la galería de un restaurante
export const addPhotoToGalleryController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: restaurantId } = req.params;

    if (!req.file) {
      res.status(400).json({ success: false, message: "No se subió ninguna foto" });
      return;
    }

    const photoUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    const updatedGallery = await addPhotoToGalleryService(restaurantId, photoUrl);

    res.status(200).json({ success: true, gallery: updatedGallery });
  } catch (error) {
    console.error("Error al agregar la foto:", error);
    res.status(500).json({ success: false, message: "Error al agregar la foto a la galería" });
  }
};

// Eliminar una foto de la galería de un restaurante
export const removePhotoFromGalleryController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id: restaurantId } = req.params;
    const { photoUrl } = req.body;

    if (!photoUrl) {
      res.status(400).json({ success: false, message: "URL de la foto es requerida" });
      return;
    }

    const updatedGallery = await removePhotoFromGalleryService(restaurantId, photoUrl);
    res.status(200).json({ success: true, gallery: updatedGallery });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
};
