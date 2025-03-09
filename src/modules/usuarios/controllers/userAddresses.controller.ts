import { Response } from "express";
import {
  getUserAddressesService,
  addAddressService,
  removeAddressService,
} from "../services/userAddresses.service";
import {AuthRequest} from '../../../../types';

export const getUserAddressesController = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Usuario no autenticado" });
      return;
    }

    const addresses = await getUserAddressesService(req.userId);
    res.json(addresses);
    
  } catch (error: unknown) {
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

    if (!address) {
      res.status(400).json({ message: "La dirección es requerida" });
      return;
    }

    const updatedAddresses = await addAddressService(userId, address);
    res.status(201).json(updatedAddresses);
  } catch (error: unknown) {
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