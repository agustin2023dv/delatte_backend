import { Document, Types } from 'mongoose';
export declare enum DiasSemana {
    Lunes = "Lunes",
    Martes = "Martes",
    Miércoles = "Mi\u00E9rcoles",
    Jueves = "Jueves",
    Viernes = "Viernes",
    Sábado = "S\u00E1bado",
    Domingo = "Domingo"
}
export interface IRestaurant extends Document {
    _id: Types.ObjectId;
    nombre: string;
    direccion: string;
    pais: string;
    localidad: string;
    codigoPostal?: string;
    telefono?: string;
    emailContacto?: string;
    logo?: string;
    descripcion?: string;
    galeriaFotos?: string[];
    calificacion: number;
    totalReservas: number;
    totalReviews: number;
    promociones?: Types.ObjectId[];
    estaTemporalmenteCerrado: boolean;
    horarios: {
        dia: DiasSemana;
        horaApertura: string;
        horaCierre: string;
    }[];
    capacidadMesas: {
        cantidad: number;
        personasPorMesa: number;
    }[];
    menus: Types.ObjectId[];
    managerPrincipal: Types.ObjectId;
    coManagers: Types.ObjectId[];
    estaAbierto: boolean;
    ultimaActualizacion: Date;
    ubicacion: {
        type: "Point";
        coordinates: [number, number];
    };
    tags?: string[];
}
//# sourceMappingURL=IRestaurant.d.ts.map