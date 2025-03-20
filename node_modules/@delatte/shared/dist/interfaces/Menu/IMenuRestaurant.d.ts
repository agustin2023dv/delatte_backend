import { Types } from "mongoose";
/**
 * Relación entre un menú y un restaurante.
 * @interface IMenuRestaurant
 */
export interface IMenuRestaurant {
    /**
     * ID del restaurante al que pertenece el menú.
     * @example new Types.ObjectId("64b8f5c2e4b0f5c2e4b0f5c5")
     */
    restaurante: Types.ObjectId;
}
//# sourceMappingURL=IMenuRestaurant.d.ts.map