export interface IRestaurantLocation {
    ubicacion: {
      type: "Point";
      coordinates: [number, number]; // [longitud, latitud]
    };
    pais: string;
    localidad: string;
    direccion: string;
    codigoPostal?: string;
  }
  