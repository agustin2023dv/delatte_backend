import { Document, Types } from "mongoose";
import { IRestaurantIdentity } from "./IRestaurantIdentity";
import { IRestaurantMetadata } from "./IRestaurantMetadata";
import { IRestaurantLocation } from "./IRestaurantLocation";
import { IRestaurantContact } from "./IRestaurantContact";
import { IRestaurantMenus } from "./IRestaurantMenus";
import { IRestaurantTags } from "./IRestaurantTags";
import { IRestaurantTradingHours } from "./IRestaurantTradingHours";
import { IRestaurantCapacity } from "./IRestaurantCapacity";
import { IRestaurantManagement } from "./IRestaurantManagement";
/**
 * Interfaz que agrupa datos operativos del restaurante.
 */
export interface IRestaurantOperationalData {
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
}
/**
 * Interfaz que agrupa contenido multimedia del restaurante.
 */
export interface IRestaurantMedia {
    logo?: string;
    galeriaFotos?: string[];
}
/**
 * Interfaz principal que representa un restaurante en la base de datos.
 */
export interface IRestaurant extends Omit<Document, "_id"> {
    /** ID único del restaurante en la base de datos */
    _id: Types.ObjectId;
    /** Información básica del restaurante */
    identity: IRestaurantIdentity;
    /** Metadatos del restaurante */
    metadata: IRestaurantMetadata;
    /** Ubicación del restaurante */
    location: IRestaurantLocation;
    /** Datos de contacto del restaurante */
    contact: IRestaurantContact;
    /** Datos operativos del restaurante */
    operationalData: IRestaurantOperationalData;
    /** Menús disponibles en el restaurante */
    menus: IRestaurantMenus;
    /** Etiquetas asociadas al restaurante */
    tags: IRestaurantTags;
    /** Horarios de atención del restaurante */
    tradingHours: IRestaurantTradingHours;
    /** Capacidad del restaurante */
    capacity: IRestaurantCapacity;
    /** Contenido multimedia del restaurante */
    media: Partial<IRestaurantMedia>;
    /** Información de gestión del restaurante */
    management: IRestaurantManagement;
}
//# sourceMappingURL=IRestaurant.d.ts.map