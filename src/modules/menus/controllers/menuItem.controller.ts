import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpPost, httpPut, httpDelete, BaseHttpController } from "inversify-express-utils";
import { MENUS_ITEM_TYPES } from "../types/menuItem.types";
import { IMenuItemService } from "../interfaces/IMenuItemService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";

@controller("/api/v1/menus")
export class MenuItemController extends BaseHttpController{
    constructor(
        @inject(MENUS_ITEM_TYPES.IMenuItemService)
        private menuItemService: IMenuItemService
    ) {
        super();
    }

    @httpPost("/:menuId/items", authMiddleware, managerOfRestaurantMiddleware)
    async addMenuItem(req: Request, res: Response) {
        try {
            const updatedMenu = await this.menuItemService.addMenuItem(req.params.menuId, req.body);
            res.status(200).json(updatedMenu);
        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú no encontrado", error: errMessage });
        }
    }
    
    @httpDelete("/:menuId/items/:itemId", authMiddleware, managerOfRestaurantMiddleware)
    async removeMenuItem(req: Request, res: Response) {
        try {
            const updatedMenu = await this.menuItemService.removeMenuItem(req.params.menuId, req.params.itemId);
            res.status(200).json(updatedMenu);
        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú o ítem no encontrado", error: errMessage });
        }
    }
    
    @httpPut("/:menuId/items/:itemId", authMiddleware, managerOfRestaurantMiddleware)
    async updateMenuItem(req: Request, res: Response) {
        try {
            const updatedMenu = await this.menuItemService.updateMenuItem(req.params.menuId, req.params.itemId, req.body);
            res.status(200).json(updatedMenu);
        } catch (error) {
            const errMessage = error instanceof Error ? error.message : "Error desconocido";
            res.status(404).json({ message: "Menú o ítem no encontrado", error: errMessage });
        }
    }
}
