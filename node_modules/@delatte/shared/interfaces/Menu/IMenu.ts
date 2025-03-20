import { Document, ObjectId, Types } from 'mongoose';
import { IMenuRestaurant } from './IMenuRestaurant';
import { IMenuDetails } from './IMenuDetails';

/**
 * Representa un ítem dentro de un menú de restaurante.
 * @interface IMenuItem
 */
export interface IMenuItem {
  /**
   * Nombre del ítem del menú.
   * @example "Pizza Margherita"
   */
  nombre: string;

  /**
   * Descripción detallada del ítem.
   * @example "Pizza con salsa de tomate, mozzarella y albahaca fresca."
   */
  descripcion: string;

  /**
   * Precio del ítem en la moneda local.
   * @example 12.99
   */
  precio: number;
}
  

export interface IMenu extends Omit<Document, "_id">, IMenuRestaurant,IMenuDetails {
  /**
   * ID único del menú.
   * @example new Types.ObjectId("64b8f5c2e4b0f5c2e4b0f5c4")
   */
  _id: Types.ObjectId;
}
