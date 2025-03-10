import { getPlacesNearbyService } from "../../integrations/services/search.service";

export class RestauranteUbicacionService {
  //* 🔍 Buscar restaurantes cercanos usando API externa
  static async getNearbyRestaurants(lat: number, lng: number, radius: number) {
    return await getPlacesNearbyService(lat, lng, radius);
  }
}
