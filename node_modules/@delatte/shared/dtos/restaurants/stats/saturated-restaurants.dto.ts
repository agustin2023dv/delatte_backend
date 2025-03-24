export interface ISaturatedRestaurantStatsDTO {
    _id: string;
    nombre: string;
    direccion: string;
    totalReservas: number;
    capacidadTotal: number;
    saturacion: number; // Ej: 1.5 significa 150% de saturación
  }
  