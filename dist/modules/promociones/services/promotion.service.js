"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromotionService = void 0;
class PromotionService {
    /**
     * Calcula el estado de la promoción basado en la fecha actual.
     * @param fechaInicio Fecha de inicio de la promoción.
     * @param fechaFin Fecha de finalización de la promoción.
     * @returns Estado de la promoción ("activa", "expirada" o "programada").
     */
    static calcularEstado(fechaInicio, fechaFin) {
        const now = new Date();
        if (fechaInicio <= now && fechaFin >= now) {
            return "activa";
        }
        else if (fechaFin < now) {
            return "expirada";
        }
        return "programada";
    }
}
exports.PromotionService = PromotionService;
