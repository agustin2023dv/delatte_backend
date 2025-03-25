import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpGet, httpPost, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import { MENUS_BASE_TYPES } from "../types/menuBase.types";
import { IMenuBaseService } from "../interfaces/IMenuBaseService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";
import { CreateMenuSchema } from "src/validators/menus/create-menu.schema";
import { UpdateMenuSchema } from "src/validators/menus/update-menu.schema";

@controller("/api/v1/menus")
export class MenuBaseController extends BaseHttpController {
    constructor(
        @inject(MENUS_BASE_TYPES.IMenuBaseService)
        private menuBaseService: IMenuBaseService
    ) {
        super();
    }
    @httpGet("/restaurant/:restaurantId")
    async getMenusByRestaurant(req: Request, res: Response) {
        try {
            const menus = await this.menuBaseService.getMenusByRestaurant(req.params.restaurantId);
            res.status(200).json(menus);
        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(500).json({ message: "Error al obtener menús", error: errMessage });
        }
    }
    
    @httpPost("/", authMiddleware, managerOfRestaurantMiddleware)
    async createMenu(req: Request, res: Response) {
      try {
        const parsed = CreateMenuSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({
            message: "Datos inválidos",
            errors: parsed.error.flatten(),
          });
        }
    
        const newMenu = await this.menuBaseService.createMenu(parsed.data);
        res.status(201).json(newMenu);
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(500).json({ message: "Error al crear menú", error: errMessage });
      }
    }
    
    @httpPut("/:menuId", authMiddleware, managerOfRestaurantMiddleware)
    async updateMenu(req: Request, res: Response) {
      try {
        const parsed = UpdateMenuSchema.safeParse(req.body);
        if (!parsed.success) {
          return res.status(400).json({
            message: "Datos inválidos",
            errors: parsed.error.flatten(),
          });
        }
    
        const updatedMenu = await this.menuBaseService.updateMenu(req.params.menuId, parsed.data);
        res.status(200).json(updatedMenu);
      } catch (error) {
        const errMessage = error instanceof Error ? error.message : "Error desconocido";
        res.status(404).json({ message: "Menú no encontrado", error: errMessage });
      }
    }
    
    @httpDelete("/:menuId", authMiddleware, managerOfRestaurantMiddleware)
    async deleteMenu(req: Request, res: Response) {
        try {
            await this.menuBaseService.deleteMenu(req.params.menuId);
            res.status(204).send();
        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú no encontrado", error: errMessage });
        }
    }
}
