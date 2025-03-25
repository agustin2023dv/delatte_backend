import { Request, Response } from "express";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  httpPut,
  httpDelete,
  BaseHttpController,
} from "inversify-express-utils";
import { MENUS_ITEM_TYPES } from "../types/menuItem.types";
import { IMenuItemService } from "../interfaces/IMenuItemService";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";
import {
  IAddMenuItemDTO,
  IRemoveMenuItemDTO,
  IUpdateMenuItemDTO,
} from "@delatte/shared/dtos";

@controller("/api/v1/menus")
export class MenuItemController extends BaseHttpController {
  constructor(
    @inject(MENUS_ITEM_TYPES.IMenuItemService)
    private menuItemService: IMenuItemService
  ) {
    super();
  }

  /**
   * Agregar un ítem a un menú.
   */
  @httpPost("/:menuId/items", authMiddleware, managerOfRestaurantMiddleware)
  async addMenuItem(req: Request, res: Response) {
    try {
      const dto: IAddMenuItemDTO = {
        menuId: req.params.menuId,
        item: req.body,
      };

      const updatedMenu = await this.menuItemService.addMenuItem(dto);
      return res.status(200).json(updatedMenu);
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return res
        .status(404)
        .json({ message: "Menú no encontrado", error: errMessage });
    }
  }

  /**
   * Eliminar un ítem de un menú.
   */
  @httpDelete("/:menuId/items/:itemId", authMiddleware, managerOfRestaurantMiddleware)
  async removeMenuItem(req: Request, res: Response) {
    try {
      const dto: IRemoveMenuItemDTO = {
        menuId: req.params.menuId,
        itemId: req.params.itemId,
      };

      const updatedMenu = await this.menuItemService.removeMenuItem(dto);
      return res.status(200).json(updatedMenu);
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return res
        .status(404)
        .json({ message: "Menú o ítem no encontrado", error: errMessage });
    }
  }

  /**
   * Actualizar un ítem de un menú.
   */
  @httpPut("/:menuId/items/:itemId", authMiddleware, managerOfRestaurantMiddleware)
  async updateMenuItem(req: Request, res: Response) {
    try {
      const dto: IUpdateMenuItemDTO = {
        menuId: req.params.menuId,
        itemId: req.params.itemId,
        item: req.body,
      };

      const updatedMenu = await this.menuItemService.updateMenuItem(dto);
      return res.status(200).json(updatedMenu);
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "Error desconocido";
      return res
        .status(404)
        .json({ message: "Menú o ítem no encontrado", error: errMessage });
    }
  }
}
