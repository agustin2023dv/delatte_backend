// src/modules/integrations/controllers/cloudinarySignature.controller.ts

import { controller, httpGet } from "inversify-express-utils";
import { Request, Response } from "express";
import cloudinary from "../../../configs/cloudinary.config";

@controller("/api/v1/generate-signature")
export class CloudinarySignatureController {
  @httpGet("/restaurantes")
  getRestauranteGallerySignature(req: Request, res: Response): void {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "delatte/restaurantes";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.json({ timestamp, signature, folder });
  }

  @httpGet("/perfil-restaurantes")
  getPerfilRestauranteSignature(req: Request, res: Response): void {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "delatte/perfil_restaurantes";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.json({ timestamp, signature, folder });
  }

  @httpGet("/perfil-usuarios")
  getPerfilUsuarioSignature(req: Request, res: Response): void {
    const timestamp = Math.round(Date.now() / 1000);
    const folder = "delatte/perfil_usuarios";

    const signature = cloudinary.utils.api_sign_request(
      { timestamp, folder },
      process.env.CLOUDINARY_API_SECRET!
    );

    res.json({ timestamp, signature, folder });
  }
}
