/**
 * DTO para crear un nuevo menú para un restaurante.
 */
export interface ICreateMenuDTO {
    restauranteId: string;
    tipo: "Comida" | "Bebidas" | "Postres";
    items: {
      nombre: string;
      descripcion: string;
      precio: number;
    }[];
  }
  