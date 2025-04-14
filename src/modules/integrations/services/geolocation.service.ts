import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.GEOCODING_API_KEY;
const BASE_URL = 'https://api.distancematrix.ai/maps/api/geocode/json';

export const getCoordinatesFromAddress = async (
  address: string
): Promise<{ latitude: number; longitude: number } | null> => {
  try {
    if (!API_KEY) {
      throw new Error("API Key no configurada en el entorno.");
    }

    const response = await axios.get(BASE_URL, {
      params: {
        address,
        key: API_KEY,
      },
    });

    const data = response.data;

    if (data && data.results && data.results.length > 0) {
      const latitude = data.results[0].geometry.location.lat;
      const longitude = data.results[0].geometry.location.lng;
      return { latitude, longitude };
    } else {
      console.warn("📭 Dirección no encontrada. Se devolverá null.");
      return null;
    }
  } catch (error) {
    console.error("🌐 Error al obtener coordenadas:", error);
    return null;
  }
};
