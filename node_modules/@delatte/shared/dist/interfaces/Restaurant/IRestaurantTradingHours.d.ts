export declare enum DiasSemana {
    Lunes = "Lunes",
    Martes = "Martes",
    Miércoles = "Mi\u00E9rcoles",
    Jueves = "Jueves",
    Viernes = "Viernes",
    Sábado = "S\u00E1bado",
    Domingo = "Domingo"
}
export interface IRestaurantTradingHours {
    horarios: {
        dia: DiasSemana;
        horaApertura: string;
        horaCierre: string;
    }[];
}
//# sourceMappingURL=IRestaurantTradingHours.d.ts.map