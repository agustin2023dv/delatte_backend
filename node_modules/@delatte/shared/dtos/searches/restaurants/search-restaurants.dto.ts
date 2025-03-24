export interface ISearchRestaurantsDTO {
    nombre?: string;
    localidad?: string;
    abierto?: boolean;
    calificacionMin?: number;
    tipoComida?: string[];
    precioMax?: number;
    distanciaMax?: number;
    page?: number;
    limit?: number;
  }
  