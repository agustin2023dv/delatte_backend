import { DiasSemana } from "../../../interfaces";
export interface IRestaurantRegistrationDTO {
    identity: {
        nombre: string;
        descripcion?: string;
    };
    contact?: {
        telefono?: string;
        emailContacto?: string;
    };
    location: {
        pais: string;
        localidad: string;
        direccion: string;
        codigoPostal?: string;
        ubicacion: {
            type: "Point";
            coordinates: [number, number];
        };
    };
    tradingHours: {
        horarios: {
            dia: DiasSemana;
            horaApertura: string;
            horaCierre: string;
        }[];
    };
    capacity: {
        capacidadMesas: {
            cantidad: number;
            personasPorMesa: number;
        }[];
    };
    operationalData: {
        status: {
            estaAbierto: boolean;
            estaTemporalmenteCerrado: boolean;
        };
        stats: {
            reservas: {
                totalReservas: number;
            };
            reviews: {
                calificacion: number;
                totalReviews: number;
            };
        };
    };
    media?: {
        logo?: string;
        galeriaFotos?: string[];
    };
    tags?: string[];
    management: {
        managerPrincipal: string;
        coManagers?: string[];
    };
}
//# sourceMappingURL=register-restaurant.dto.d.ts.map