"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getReservationsByUserService = exports.getReservationsByRestaurantService = exports.getReservationsByIdService = exports.getAllReservationsService = exports.cancelReservationService = exports.updateReservationService = exports.getReservationByIdService = exports.createSuperadminReservationService = exports.createManagerReservationService = exports.createCustomerReservationService = void 0;
const Reservation_model_1 = __importDefault(require("../models/Reservation.model"));
const restaurant_service_1 = require("./restaurant.service");
const Restaurant_model_1 = __importDefault(require("../models/Restaurant.model"));
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * Crea una reserva como cliente (customer)
 */
const createCustomerReservationService = async (userId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) => {
    // Verifica que el restaurante exista y esté abierto
    const restaurant = await Restaurant_model_1.default.findById(restauranteId);
    if (!restaurant) {
        throw new Error("Restaurante no encontrado");
    }
    return await Reservation_model_1.default.create({
        usuario: userId,
        restaurante: restauranteId,
        fecha,
        horario,
        numAdultos,
        numNinos,
        pedidosEspeciales,
        estado: "Confirmada",
    });
};
exports.createCustomerReservationService = createCustomerReservationService;
/**
 * Crea una reserva como manager (para clientes)
 */
const createManagerReservationService = async (managerId, clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) => {
    // Convertir los IDs a `ObjectId`
    const restauranteObjectId = new mongoose_1.default.Types.ObjectId(restauranteId);
    const clienteObjectId = new mongoose_1.default.Types.ObjectId(clienteId);
    const managerObjectId = new mongoose_1.default.Types.ObjectId(managerId);
    // Buscar el restaurante
    const restaurant = await Restaurant_model_1.default.findById(restauranteObjectId);
    if (!restaurant) {
        throw new Error("Restaurante no encontrado");
    }
    // Verificar si el manager tiene permisos sobre el restaurante
    const esCoManager = restaurant.coManagers.some((coManager) => coManager.toString() === managerObjectId.toString());
    const esManagerPrincipal = restaurant.managerPrincipal.toString() === managerObjectId.toString();
    if (!esCoManager && !esManagerPrincipal) {
        throw new Error("No puedes crear reservas en un restaurante que no administras");
    }
    // Crear la reserva
    return await Reservation_model_1.default.create({
        usuario: clienteObjectId,
        restaurante: restauranteObjectId,
        fecha,
        horario,
        numAdultos,
        numNinos,
        pedidosEspeciales,
        estado: "Confirmada",
    });
};
exports.createManagerReservationService = createManagerReservationService;
/**
 * Crea una reserva como superadmin (puede forzar reservas)
 */
const createSuperadminReservationService = async (clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) => {
    return await Reservation_model_1.default.create({
        usuario: clienteId,
        restaurante: restauranteId,
        fecha,
        horario,
        numAdultos,
        numNinos,
        pedidosEspeciales,
        estado: "Confirmada",
    });
};
exports.createSuperadminReservationService = createSuperadminReservationService;
// Servicio para obtener una reserva por su ID
const getReservationByIdService = async (id) => {
    return await Reservation_model_1.default.findById(id)
        .populate("restaurante", "nombre direccion")
        .populate("usuario", "nombre apellido email");
};
exports.getReservationByIdService = getReservationByIdService;
// Servicio para actualizar una reserva
const updateReservationService = async (reservationId, updatedData) => {
    try {
        // Verifica si "fecha" existe antes de crear un objeto Date
        const fecha = updatedData.fecha ? new Date(updatedData.fecha) : undefined;
        const updatedReservation = await Reservation_model_1.default.findByIdAndUpdate(reservationId, {
            ...updatedData,
            ...(fecha && { fecha }), // Solo incluye "fecha" si está definido
        }, { new: true });
        if (!updatedReservation) {
            throw new Error("No se encontró la reserva para actualizar.");
        }
        return updatedReservation;
    }
    catch (error) {
        throw new Error("Error actualizando la reserva");
    }
};
exports.updateReservationService = updateReservationService;
// Servicio para cancelar una reserva
const cancelReservationService = async (reservationId) => {
    try {
        const canceledReservation = await Reservation_model_1.default.findByIdAndUpdate(reservationId, { estado: "Cancelada" }, { new: true });
        if (!canceledReservation) {
            throw new Error("No se encontró la reserva para cancelar.");
        }
        return canceledReservation;
    }
    catch (error) {
        throw new Error("Error cancelando la reserva");
    }
};
exports.cancelReservationService = cancelReservationService;
// Servicio para obtener todas las reservas (solo superadmins)
const getAllReservationsService = async () => {
    try {
        return await Reservation_model_1.default.find()
            .populate("restaurante", "nombre direccion")
            .populate("usuario", "nombre apellido email");
    }
    catch (error) {
        throw new Error("Error obteniendo todas las reservas");
    }
};
exports.getAllReservationsService = getAllReservationsService;
const getReservationsByIdService = async (userId, role) => {
    let reservations;
    if (role === "customer") {
        // Obtener reservas del cliente
        reservations = await Reservation_model_1.default.find({ usuario: userId }) // Cambiado cliente -> usuario
            .populate("restaurante", "nombre apellido direccion");
    }
    else if (role === "manager") {
        // Obtener reservas del restaurante del manager
        const restauranteId = await (0, restaurant_service_1.getRestauranteIdByManagerService)(userId);
        reservations = await Reservation_model_1.default.find({ restaurante: restauranteId })
            .populate("usuario", "nombre direccion email"); // Cambiado cliente -> usuario
    }
    else {
        throw new Error("Rol no válido o usuario no encontrado.");
    }
    // Si no hay reservas
    if (!reservations || reservations.length === 0) {
        return { message: "No hay reservas disponibles." };
    }
    return reservations;
};
exports.getReservationsByIdService = getReservationsByIdService;
// ✅ Obtener reservas de un restaurante
const getReservationsByRestaurantService = async (restaurantId) => {
    try {
        return await Reservation_model_1.default.find({ restaurante: restaurantId })
            .populate("usuario", "nombre apellido email phone");
    }
    catch (error) {
        throw new Error("Error al obtener reservas del restaurante.");
    }
};
exports.getReservationsByRestaurantService = getReservationsByRestaurantService;
// ✅ Obtener reservas de un usuario
const getReservationsByUserService = async (userId) => {
    try {
        return await Reservation_model_1.default.find({ usuario: userId })
            .populate("usuario", "nombre apellido email")
            .populate("restaurante", "nombre direccion");
    }
    catch (error) {
        throw new Error("Error al obtener reservas del usuario.");
    }
};
exports.getReservationsByUserService = getReservationsByUserService;
