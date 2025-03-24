export interface IFilterReservationsDTO {
    usuarioId?: string;
    restauranteId?: string;
    estado?: "Pendiente" | "Confirmada" | "Cancelada";
    desde?: string; // Fecha desde
    hasta?: string; // Fecha hasta
  }
  