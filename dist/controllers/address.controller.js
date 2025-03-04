"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeAddressController = exports.addAddressController = exports.getUserAddressesController = void 0;
const address_service_1 = require("../services/address.service");
const getUserAddressesController = async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({ message: "Usuario no autenticado" });
            return;
        }
        const addresses = await (0, address_service_1.getUserAddressesService)(req.userId);
        res.json(addresses);
    }
    catch (error) {
        console.error("Error en getUserAddressesController:", error);
        res.status(500).json({ message: error.message });
    }
};
exports.getUserAddressesController = getUserAddressesController;
const addAddressController = async (req, res) => {
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
        const updatedAddresses = await (0, address_service_1.addAddressService)(userId, address);
        res.status(201).json(updatedAddresses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.addAddressController = addAddressController;
const removeAddressController = async (req, res) => {
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
        const updatedAddresses = await (0, address_service_1.removeAddressService)(userId, address);
        res.status(200).json(updatedAddresses);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.removeAddressController = removeAddressController;
