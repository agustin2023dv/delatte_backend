// src/modules/restaurantes/controllers/restaurantBase.controller.ts

import { controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { RESTAURANT_BASE_TYPES } from "../types/restaurantBase.types";
import { managerOfRestaurantMiddleware } from "../../../middlewares/restaurant.middleware";
import { IRestaurantBaseService } from "../interfaces/IRestaurantBaseService";
import { RestaurantRegistrationService } from "../services/restaurantRegistration.service";
import { IRestaurantRegistrationInitialDTO, IManagerRegistrationDTO } from "@delatte/shared/dtos";

@controller("/api/v1/restaurants")
export class RestaurantBaseController {
  constructor(
    @inject(RESTAURANT_BASE_TYPES.IRestaurantService)
    private restaurantService: IRestaurantBaseService,

    @inject(RESTAURANT_BASE_TYPES.IRestaurantRegisterService)
    private restaurantRegistrationService: RestaurantRegistrationService
  ) {}

  @httpGet("/")
  async getAllRestaurants(req: Request, res: Response): Promise<void> {
    try {
      const restaurants = await this.restaurantService.getAllRestaurants();
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener restaurantes", error });
    }
  }

  @httpGet("/:id")
  async getRestaurantById(req: Request, res: Response): Promise<void> {
    try {
      const restaurant = await this.restaurantService.getRestaurantById(req.params.id);
      if (!restaurant) {
        res.status(404).json({ message: "Restaurante no encontrado" });
        return;
      }
      res.status(200).json(restaurant);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener el restaurante", error });
    }
  }

  @httpGet("/managers/:id/restaurants")
  async getRestaurantsByManagerId(req: Request, res: Response): Promise<void> {
    try {
      const restaurants = await this.restaurantService.getRestaurantsByManagerId(req.params.id);
      res.status(200).json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Error al obtener los restaurantes", error });
    }
  }

  // ⚠️ IMPORTANTE: Este endpoint permite registrar un manager y restaurante sin autenticación
// porque es parte del flujo inicial de alta. No requiere token.
  @httpPost("/")
  async registerRestaurantAndManager(req: Request, res: Response): Promise<void> {
    try {
      const restaurantData: IRestaurantRegistrationInitialDTO = req.body.restaurant;
      const managerData: IManagerRegistrationDTO = req.body.manager;

      const result = await this.restaurantRegistrationService.registerRestaurantAndManager(
        restaurantData,
        managerData
      );

      res.status(201).json(result);
    } catch (error) {
      console.error("Error en el controlador:", error);
      res.status(500).json({ message: "Error al registrar el restaurante y manager", error });
    }
  }

  @httpPut("/:id", managerOfRestaurantMiddleware)
  async updateRestaurant(req: Request, res: Response): Promise<void> {
    try {
      const updatedRestaurant = await this.restaurantService.updateRestaurant(req.params.id, req.body);
      if (!updatedRestaurant) {
        res.status(404).json({ message: "Restaurante no encontrado" });
        return;
      }
      res.status(200).json(updatedRestaurant);
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar el restaurante", error });
    }
  }
}
