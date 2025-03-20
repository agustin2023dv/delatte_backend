import { IMenuItem } from "./IMenu";
/**
 * Contiene la información detallada de un menú de restaurante.
 * @interface IMenuDetails
 */
export interface IMenuDetails {
    /**
     * Tipo de menú: Comida, Bebidas o Postres.
     * @example "Comida"
     */
    tipo: "Comida" | "Bebidas" | "Postres";
    /**
     * Lista de ítems disponibles en el menú.
     */
    items: IMenuItem[];
}
//# sourceMappingURL=IMenuDetails.d.ts.map