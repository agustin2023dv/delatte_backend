import { getUserAddressesService, addAddressService, removeAddressService, } from "../services/address.service";
export const getUserAddressesController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const userId = req.user.id;
        const addresses = await getUserAddressesService(userId);
        res.json(addresses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const addAddressController = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const removeAddressController = async (req, res) => {
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
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
