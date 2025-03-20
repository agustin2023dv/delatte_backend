"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReservationData = exports.checkDisponibilidadMiddleware = void 0;
const Restaurant_model_1 = __importDefault(require("../modules/restaurantes/models/Restaurant.model"));
const Reservation_model_1 = __importDefault(require("../modules/reservas/models/Reservation.model"));
/**
 * Middleware para verificar disponibilidad de reservas en base a la capacidad del restaurante
 */
const checkDisponibilidadMiddleware = async (req, res, next) => {
    try {
        const { restaurante, fecha, horario, numAdultos, numNinos } = req.body;
        // Verificar si el restaurante existe
        const restauranteData = await Restaurant_model_1.default.findById(restaurante);
        if (!restauranteData) {
            return next(new Error("El restaurante no existe.")); // ← Usar next() en lugar de return res.json()
        }
        // Calcular la capacidad total del restaurante
        const capacidadMesas = restauranteData.capacity.capacidadMesas.reduce((acc, mesa) => ({
            totalMesas: acc.totalMesas + mesa.cantidad,
            totalPersonas: acc.totalPersonas + mesa.cantidad * mesa.personasPorMesa,
        }), { totalMesas: 0, totalPersonas: 0 });
        // Consultar reservas existentes en el mismo horario
        const reservasExistentes = await Reservation_model_1.default.find({
            restaurante,
            fecha,
            horario,
        });
        const totalReservas = reservasExistentes.reduce((acc, reserva) => ({
            totalAdultos: acc.totalAdultos + reserva.numAdultos,
            totalNinos: acc.totalNinos + reserva.numNinos,
        }), { totalAdultos: 0, totalNinos: 0 });
        // Verificar disponibilidad de mesas y capacidad
        const totalPersonasActual = totalReservas.totalAdultos + totalReservas.totalNinos;
        const personasEnReservaActual = numAdultos + numNinos;
        if (reservasExistentes.length >= capacidadMesas.totalMesas) {
            return next(new Error("No hay disponibilidad de mesas en el horario seleccionado.")); // ← Usar next()
        }
        if (totalPersonasActual + personasEnReservaActual > capacidadMesas.totalPersonas) {
            return next(new Error("No hay capacidad suficiente para la cantidad de personas en el horario seleccionado.")); // ← Usar next()
        }
        next(); // Pasar al siguiente middleware
    }
    catch (error) {
        next(error); // ← Usar next(error) para manejar errores
    }
};
exports.checkDisponibilidadMiddleware = checkDisponibilidadMiddleware;
/**
 * Middleware para validar los datos de la reserva antes de procesarla
 */
const validateReservationData = (req, res, next) => {
    try {
        const { dia, horario, numAdultos, numNinos } = req.body;
        if (!dia || !horario || numAdultos === undefined || numNinos === undefined) {
            res.status(400).json({ message: "Todos los campos de la reserva son obligatorios." });
            return;
        }
        // Validar que la fecha no sea en el pasado
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Resetear la hora para comparar solo la fecha
        const fechaReserva = new Date(dia);
        if (fechaReserva < today) {
            res.status(400).json({ message: "La fecha de la reserva no puede ser en el pasado." });
            return;
        }
        // Validar el formato de horario (ej: "14:30")
        const horarioRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
        if (!horarioRegex.test(horario)) {
            res.status(400).json({ message: "El horario no es válido. Debe tener el formato HH:MM." });
            return;
        }
        // Validar que el número de adultos sea mayor que 0
        if (numAdultos <= 0) {
            res.status(400).json({ message: "Debe haber al menos un adulto en la reserva." });
            return;
        }
        // Validar que el número de niños no sea negativo
        if (numNinos < 0) {
            res.status(400).json({ message: "El número de niños no puede ser negativo." });
            return;
        }
        next(); // Si todo está bien, continuar con el siguiente middleware o controlador
    }
    catch (error) {
        console.error("❌ Error en validateReservationData:", error);
        res.status(500).json({ message: "Error en la validación de la reserva.", error });
    }
};
exports.validateReservationData = validateReservationData;
