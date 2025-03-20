export interface IPlacesIntegrationService {
    getPlacesNearby(lat: number, lng: number, radius: number): Promise<any>;
  }
  