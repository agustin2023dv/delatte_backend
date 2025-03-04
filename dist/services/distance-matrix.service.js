"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesFromAddress = void 0;
const axios_1 = __importDefault(require("axios"));
const API_KEY = 'RY04slFBRNkONTJKGjDGHhtrtTSOWnvIUI1pVhdbIohUwxdA3z1O76d0OCgMzQ4Z';
const BASE_URL = 'https://api.distancematrix.ai/maps/api/geocode/json';
const getCoordinatesFromAddress = async (address) => {
    try {
        const response = await axios_1.default.get(BASE_URL, {
            params: {
                address,
                key: API_KEY
            }
        });
        const data = response.data;
        console.log("API Response:", data);
        // Verifica que `data.result` existe y tiene al menos un elemento
        if (data && data.result && data.result.length > 0) {
            const latitude = data.result[0].geometry.location.lat;
            const longitude = data.result[0].geometry.location.lng;
            return { latitude, longitude };
        }
        else {
            console.error("No se encontraron coordenadas para esta dirección:", data.status);
            throw new Error("No se pudieron obtener coordenadas para la dirección proporcionada.");
        }
    }
    catch (error) {
        console.error("Error al obtener las coordenadas:", error);
        throw error;
    }
};
exports.getCoordinatesFromAddress = getCoordinatesFromAddress;
