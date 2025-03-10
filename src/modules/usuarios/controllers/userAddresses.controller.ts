import { Response } from "express";
import { AuthRequest } from "../../../../types";
import { UserAddressService } from "../services/userAddresses.service";

export const getUserAddressesController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const addresses = await UserAddressService.getUserAddresses(req.userId);
    res.json(addresses);
  } catch (error) {
    console.error("Error en getUserAddressesController:", error);
    res.status(500).json({ message: (error as Error).message });
  }
};

export const addAddressController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const userId = req.user.id;
    const { address } = req.body;

    const updatedAddresses = await UserAddressService.addAddress(userId, address);
    res.status(201).json(updatedAddresses);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export const removeAddressController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const userId = req.user.id;
    const { address } = req.body;

    const updatedAddresses = await UserAddressService.removeAddress(userId, address);
    res.status(200).json(updatedAddresses);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
