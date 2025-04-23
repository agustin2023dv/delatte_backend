import { Response } from "express";
import { inject } from "inversify";
import { AuthRequest } from "../../../../types";
import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { UserAddressService } from "../services/userAddresses.service";
import { USER_ADDRESSES_TYPES } from "../types/userAddresses.types";

@controller("/api/v1/user/addresses")
export class UserAddressController {
  private userAddressService: UserAddressService;

  constructor(@inject(USER_ADDRESSES_TYPES.UserAddressService) userAddressService: UserAddressService) {
    this.userAddressService = userAddressService;
  }

  @httpGet("/")
  async getUserAddresses(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }
      const addresses = await this.userAddressService.getUserAddresses(req.userId);
      res.json(addresses);
    } catch (error) {
      console.error("Error en getUserAddresses:", error);
      res.status(500).json({ message: (error as Error).message });
    }
  }

  @httpPost("/")
  async addAddress(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }
      const { address } = req.body;
      const updatedAddresses = await this.userAddressService.addAddress(req.user.id, address);
      res.status(201).json(updatedAddresses);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }

  @httpDelete("/")
  async removeAddress(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: "Usuario no autenticado" });
        return;
      }
      const { address } = req.body;
      const updatedAddresses = await this.userAddressService.removeAddress(req.user.id, address);
      res.status(200).json(updatedAddresses);
    } catch (error) {
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
