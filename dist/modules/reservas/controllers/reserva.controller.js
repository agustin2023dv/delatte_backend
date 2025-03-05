"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationsByUserController = exports.getReservationsByRestaurantController = exports.getReservationByIdController = exports.getAllReservationsController = exports.updateReservationController = exports.cancelReservationController = exports.getUserReservationsController = exports.createReservationController = void 0;
const reservation_service_1 = require("../services/reservation.service");
/**
 * Controlador para crear una reserva según el rol del usuario autenticado
 */
const createReservationController = async (req, res) => {
    try {
        const userId = req.user.id; // ID del usuario autenticado
        const { restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales, clienteId } = req.body;
        const userRole = req.user.role; // customer, manager o superadmin
        if (!restauranteId || !fecha || !horario || numAdultos < 1) {
            res.status(400).json({ message: "Datos insuficientes para crear la reserva" });
            return;
        }
        let reserva;
        if (userRole === "customer") {
            if (clienteId && clienteId !== userId) {
                res.status(403).json({ message: "No puedes reservar en nombre de otro usuario" });
                return;
            }
            reserva = await (0, reservation_service_1.createCustomerReservationService)(userId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
        }
        else if (userRole === "manager") {
            reserva = await (0, reservation_service_1.createManagerReservationService)(userId, clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
        }
        else if (userRole === "superadmin") {
            reserva = await (0, reservation_service_1.createSuperadminReservationService)(clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
        }
        else {
            res.status(403).json({ message: "No tienes permisos para crear una reserva" });
            return;
        }
        res.status(201).json(reserva);
    }
    catch (error) {
        console.error("Error al crear reserva:", error);
        res.status(500).json({ message: "Error interno al crear la reserva", error: error instanceof Error ? error.message : "Error desconocido" });
    }
};
exports.createReservationController = createReservationController;
//* Controlador para ver las reservas del usuario (cliente o manager)
const getUserReservationsController = async (req, res) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Usuario no autenticado." });
            return;
        }
        const result = await (0, reservation_service_1.getReservationsByIdService)(req.user._id.toString(), req.user.role);
        if (Array.isArray(result) && result.length === 0) {
            res.status(200).json({ message: "No hay reservas disponibles." });
            return;
        }
        res.status(200).json(result);
    }
    catch (error) {
        console.error("Error al obtener reservas:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};
exports.getUserReservationsController = getUserReservationsController;
//*Controlador para CANCELAR una reserva
const cancelReservationController = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservation = await (0, reservation_service_1.cancelReservationService)(reservationId);
        if (!reservation) {
            res.status(404).json({ message: "Reserva no encontrada." });
            return;
        }
        res.status(200).json({ message: "Reserva cancelada con éxito.", reservation });
    }
    catch (error) {
        console.error("Error cancelando la reserva:", error);
        res.status(500).json({ message: "Error cancelando la reserva", error });
    }
};
exports.cancelReservationController = cancelReservationController;
//*Controlador para MODIFICAR una reserva
const updateReservationController = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const updateData = req.body;
        const updatedReservation = await (0, reservation_service_1.updateReservationService)(reservationId, updateData);
        if (!updatedReservation) {
            res.status(404).json({ message: "Reserva no encontrada." });
            return;
        }
        res.status(200).json({ message: "Reserva actualizada con éxito.", updatedReservation });
    }
    catch (error) {
        console.error("Error actualizando la reserva:", error);
        res.status(500).json({ message: "Error actualizando la reserva", error });
    }
};
exports.updateReservationController = updateReservationController;
//*Controlador para TRAER TODAS las reservas
const getAllReservationsController = async (req, res) => {
    try {
        const reservations = await (0, reservation_service_1.getAllReservationsService)();
        res.status(200).json(reservations);
    }
    catch (error) {
        console.error("Error obteniendo todas las reservas:", error);
        res.status(500).json({ message: "Error obteniendo todas las reservas", error });
    }
};
exports.getAllReservationsController = getAllReservationsController;
//*Controlador para BUSCAR una reserva por ID
const getReservationByIdController = async (req, res) => {
    try {
        const reservationId = req.params.id;
        const reservation = await (0, reservation_service_1.getReservationByIdService)(reservationId);
        if (!reservation) {
            res.status(404).json({ message: "Reserva no encontrada." });
            return;
        }
        res.status(200).json(reservation);
    }
    catch (error) {
        console.error("Error obteniendo la reserva:", error);
        res.status(500).json({ message: "Error obteniendo la reserva", error });
    }
};
exports.getReservationByIdController = getReservationByIdController;
// ✅ Obtener reservas de un restaurante
const getReservationsByRestaurantController = async (req, res) => {
    try {
        const { restaurantId } = req.params;
        const reservations = await (0, reservation_service_1.getReservationsByRestaurantService)(restaurantId);
        res.status(200).json(reservations);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener reservas del restaurante." });
    }
};
exports.getReservationsByRestaurantController = getReservationsByRestaurantController;
// ✅ Obtener reservas de un usuario
const getReservationsByUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservations = await (0, reservation_service_1.getReservationsByUserService)(userId);
        res.status(200).json(reservations);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener reservas del usuario." });
    }
};
exports.getReservationsByUserController = getReservationsByUserController;
