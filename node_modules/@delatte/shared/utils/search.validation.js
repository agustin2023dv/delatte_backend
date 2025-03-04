"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSearchQuery = void 0;
const validateSearchQuery = (query) => {
    // Verifica que la consulta no esté vacía y que solo contenga letras, números y espacios
    const isValid = /^[a-zA-Z0-9\s]+$/.test(query);
    return isValid;
};
exports.validateSearchQuery = validateSearchQuery;
