import axios from 'axios';
import { injectable } from 'inversify';
import { IPlacesIntegrationService } from '../interfaces/IPlacesIntegrationService';

@injectable()
export class PlacesIntegrationService implements IPlacesIntegrationService {
  private API_KEY = process.env.GEOCODING_API_KEY;
  private BASE_URL = 'https://api.distancematrix.ai/maps/api/place/nearbysearch/json';

  async getPlacesNearby(lat: number, lng: number, radius: number): Promise<any> {
    try {
      if (!this.API_KEY) {
        throw new Error("API Key no configurada en el entorno.");
      }

      const response = await axios.get(this.BASE_URL, {
        params: {
          location: `${lat},${lng}`,
          radius,
          key: this.API_KEY
        }
      });

      return response.data.results || [];
    } catch (error) {
      console.error("Error al obtener lugares cercanos:", error);
      throw new Error("No se pudieron obtener los lugares cercanos.");
    }
  }
}
