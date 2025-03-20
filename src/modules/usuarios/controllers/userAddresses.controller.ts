import { Response } from "express";
<<<<<<< Updated upstream
import {
  getUserAddressesService,
  addAddressService,
  removeAddressService,
} from "../services/userAddresses.service";
import {AuthRequest} from '../../../../types';
=======
import { inject } from "inversify";
import { AuthRequest } from "../../../../types";
import { controller, httpGet, httpPost, httpDelete } from "inversify-express-utils";
import { UserAddressService } from "../services/userAddresses.service";
import { USER_ADDRESSES_TYPES } from "../types/userAddresses.types";
>>>>>>> Stashed changes

@controller("/user/addresses")
export class UserAddressController {
  private userAddressService: UserAddressService;

<<<<<<< Updated upstream
    const addresses = await getUserAddressesService(req.userId);
    res.json(addresses);
    
  } catch (error: unknown) {
    console.error("Error en getUserAddressesController:", error);
    res.status(500).json({ message: (error as Error).message });
=======
  constructor(@inject(USER_ADDRESSES_TYPES.UserAddressService) userAddressService: UserAddressService) {
    this.userAddressService = userAddressService;
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream

export const addAddressController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const userId = req.user.id;
    const { address } = req.body;

    if (!address) {
      res.status(400).json({ message: "La dirección es requerida" });
      return;
    }

    const updatedAddresses = await addAddressService(userId, address);
    res.status(201).json(updatedAddresses);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
=======
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
>>>>>>> Stashed changes
  }

<<<<<<< Updated upstream

export const removeAddressController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const userId = req.user.id;
    const { address } = req.body;

    if (!address) {
      res.status(400).json({ message: "La dirección es requerida" });
      return;
    }

    const updatedAddresses = await removeAddressService(userId, address);
    res.status(200).json(updatedAddresses);
  } catch (error: unknown) {
    res.status(500).json({ message: (error as Error).message });
  }
};
=======
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
>>>>>>> Stashed changes
