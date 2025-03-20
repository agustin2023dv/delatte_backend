export enum DiasSemana {
    Lunes = "Lunes",
    Martes = "Martes",
    Miércoles = "Miércoles",
    Jueves = "Jueves",
    Viernes = "Viernes",
    Sábado = "Sábado",
    Domingo = "Domingo",
  }
  
  export interface IRestaurantTradingHours {
    horarios: {
      dia: DiasSemana;
      horaApertura: string;
      horaCierre: string;
    }[];
  }
  