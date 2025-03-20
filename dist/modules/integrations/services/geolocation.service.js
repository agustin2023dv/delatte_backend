"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoordinatesFromAddress = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const API_KEY = process.env.GEOCODING_API_KEY;
const BASE_URL = 'https://api.distancematrix.ai/maps/api/geocode/json';
const getCoordinatesFromAddress = async (address) => {
    try {
        if (!API_KEY) {
            throw new Error("API Key no configurada en el entorno.");
        }
        const response = await axios_1.default.get(BASE_URL, {
            params: {
                address,
                key: API_KEY
            }
        });
        const data = response.data;
        if (data && data.results && data.results.length > 0) {
            const latitude = data.results[0].geometry.location.lat;
            const longitude = data.results[0].geometry.location.lng;
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
