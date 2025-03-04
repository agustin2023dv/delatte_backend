"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNumNinos = exports.validateNumAdultos = exports.validateHorario = exports.validateFecha = void 0;
// Validar la fecha
const validateFecha = (fecha) => {
    const hoy = new Date();
    const fechaReserva = new Date(fecha);
    if (!fecha) {
        return "La fecha es requerida.";
    }
    if (fechaReserva < hoy) {
        return "La fecha no puede ser en el pasado.";
    }
    return null; // No hay errores
};
exports.validateFecha = validateFecha;
// Validar el horario
const validateHorario = (horario) => {
    const horarioRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!horario) {
        return "El horario es requerido.";
    }
    if (!horarioRegex.test(horario)) {
        return "El formato de la hora no es válido. Usa el formato HH:MM.";
    }
    return null; // No hay errores
};
exports.validateHorario = validateHorario;
// Validar el número de adultos
const validateNumAdultos = (numAdultos) => {
    if (numAdultos === undefined || numAdultos === null) {
        return "La cantidad de adultos es requerida.";
    }
    if (numAdultos < 1) {
        return "Debe haber al menos 1 adulto en la reserva.";
    }
    if (numAdultos > 25) {
        return "La cantidad máxima de adultos es 25.";
    }
    return null; // No hay errores
};
exports.validateNumAdultos = validateNumAdultos;
// Validar el número de niños
const validateNumNinos = (numNinos) => {
    if (numNinos > 10) {
        return "La cantidad máxima de niños es 10.";
    }
    if (numNinos < 0) {
        return "La cantidad de niños no puede ser negativa.";
    }
    return null; // No hay errores
};
exports.validateNumNinos = validateNumNinos;
