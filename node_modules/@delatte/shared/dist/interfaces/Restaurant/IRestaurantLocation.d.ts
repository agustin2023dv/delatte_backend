export interface IRestaurantLocation {
    ubicacion: {
        type: "Point";
        coordinates: [number, number];
    };
    pais: string;
    localidad: string;
    direccion: string;
    codigoPostal?: string;
}
//# sourceMappingURL=IRestaurantLocation.d.ts.map