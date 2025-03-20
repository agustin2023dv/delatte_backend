import { Document, Types } from "mongoose";
import { IPromotionDetails } from "./IPromotionDetails";
import { IPromotionStatus } from "./IPromotionStatus";
/**
 * Interfaz principal que representa una promoción en la base de datos.
 * Cumple con los principios SOLID aplicables a interfaces.
 */
export interface IPromotion extends Omit<Document, "_id">, IPromotionDetails, IPromotionStatus {
    /**
     * ID único de la promoción.
     * @example new Types.ObjectId("64b8f5c2e4b0f5c2e4b0f5c2")
     */
    _id: Types.ObjectId | string;
}
//# sourceMappingURL=IPromotion.d.ts.map